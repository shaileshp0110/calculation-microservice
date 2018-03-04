'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger

const measures = require('./measures.js').measures
const converter = require('../exchangeRateWrapper/erWrapper.js')
const allowances = require('../allowancesWrapper/allowanceswrapper.js')


const convert = (calculationRequests) => {
  return(new Promise((resolve, reject) => {
    const conversions = calculationRequests.map( calculationRequest => {
      return(applyConversion(calculationRequest))

    })

    Promise.all(conversions).then(conversions => {
      resolve(conversions)
    })
    .catch(error =>{
      logger.error(error)
    })

  }))

}

const applyConversion = (calculationRequest => {
  return(new Promise((resolve, reject) => {
    if(typeof calculationRequest.valuecurrency == 'undefined'){ //no source currency - assumed GBP, customs value is entered value
      calculationRequest.valuecurrency = "GBP"
      calculationRequest.customsvalue = calculationRequest.value
      resolve(calculationRequest)

    }
    else if(calculationRequest.valuecurrency == "GBP"){         //already expressed in GBP -  customs value is entered value
      calculationRequest.customsvalue = calculationRequest.value
      resolve(calculationRequest)
    }
    else{
      converter.convert(calculationRequest.valuecurrency,"GBP", calculationRequest.value).then(conversion => {
        calculationRequest.customsvalue = conversion.convertedvalue
        calculationRequest.currencyconversion = conversion
        resolve(calculationRequest)
      })
      .catch(error =>{
        logger.error(error)
      })
    }

  }))

})

const allocateAllowances = (countryCode, items) => {
  return(new Promise((resolve, reject) =>{
    const allocatedAllowances={
        

      }

      //Split items into alcohol, tobacco, and other
      const alcoholItems = []
      const tobaccoItems = []
      const otherItems = []
      const alcoholRegex = new RegExp("^22[0-9]{6}$")
      const tobaccoRegex = new RegExp("^24[0-9]{6}$")

      items.forEach( item =>{
        let aMatch = item.commoditycode.match(alcoholRegex)
        let tMatch = item.commoditycode.match(tobaccoRegex)
        if(aMatch && (aMatch[0] !== "")) alcoholItems.push(item)
          else if(tMatch && (tMatch[0] !== "")) tobaccoItems.push(item)
            else otherItems.push(item)
        
      })

      let allowancesCode = "ROW"
      if(isEUMember(countryCode))allowancesCode="EU"

      allowances.getAllowances(allowancesCode).then(allAllowances => {

        return allocateTobaccoAllowances(allowancesCode,allAllowances,tobaccoItems)

      })
      .then(tobaccoAllowances =>{
        //resolve(tobaccoAllowances)//returnedObject
        allocatedAllowances["tobacco"] = tobaccoAllowances
        resolve(allocatedAllowances)
      })
      .catch(error => {
        logger.error(error)
      })

  }))
}

const allocateTobaccoAllowances = (allowancesCode,regionAllowances,items) =>{
  //logger.info("Regionalallowances: " + JSON.stringify(regionAllowances.tobacco))
  return(new Promise((resolve, reject) => {
    let returnedObject ={
      "allowances":[],


    }
    
    let declarations = []
    calculate(items).then(calculations => { //calculate the duty due on each item

      const allowances = { //working copy of allowances
          "cigarettes":regionAllowances.tobacco.cigarettes.limit,
          "cigarillos":regionAllowances.tobacco.cigarillos.limit,
          "cigars":regionAllowances.tobacco.cigars.limit,
          "tobacco":regionAllowances.tobacco.tobacco.limit


       }
      calculations.forEach(calculation =>{  //work out the duties/unit for each item, and get the allowances

         

        if(typeof calculation.request.quantity !== 'undefined'){
          calculation.request.dutyperunit = calculation.total / calculation.request.quantity
        }
        else 
          if(typeof calculation.request.weight !== 'undefined'){
          calculation.request.dutyperunit = calculation.total / calculation.request.weight
        }
        
        //calculation.request.allowance = getItemLimit(calculation.request.commoditycode,calculation.request.commoditycodequalifier,regionAllowances.tobacco)


      })

      //now do the allocation

      

       do{
       
              //get the limit
             // calculation.request.allowance = getItemLimit(calculation.request.commoditycode,calculation.request.commoditycodequalifier,regionAllowances.tobacco)
            calculations.forEach(calculation => {
              let category = getItemAllowanceTobaccoCategory(calculation.request.commoditycode,calculation.request.commoditycodequalifier,regionAllowances.tobacco)
              calculation.request.allowance ={
                "against": category,
                "limit": allowances[category]
              }

              if(typeof calculation.request.quantity !== 'undefined'){
                
                calculation.request.savingagainstallowance = allowances[category] > calculation.request.quantity ? calculation.request.quantity * calculation.request.dutyperunit : allowances[category] * calculation.request.dutyperunit
                calculation.request.claimagainstallowance = allowances[category] > calculation.request.quantity ? calculation.request.quantity  : allowances[category] 

              }
              else if(typeof calculation.request.weight !== 'undefined'){
                
                 calculation.request.savingagainstallowance = allowances[category] > calculation.request.weight ? calculation.request.weight * calculation.request.dutyperunit : allowances[category] * calculation.request.dutyperunit
                 calculation.request.claimagainstallowance = allowances[category] > calculation.request.weight ? calculation.request.weight  : allowances[category]

              }
            })

  

            calculations.sort((a,b) =>{
              if(a.request.savingagainstallowance > b.request.savingagainstallowance) return -1
              if(b.request.savingagainstallowance > a.request.savingagainstallowance) return 1
              return 0
            })

            let ratio = calculations[0].request.claimagainstallowance / allowances[calculations[0].request.allowance.against]

            //adjust remining allowances
            for(let a in allowances){
              allowances[a] -= ratio * allowances[a]
            }

           let allowance = Object.assign({},calculations[0].request)
           let declaration = Object.assign({},calculations[0].request)
           

           if(typeof allowance.quantity !== 'undefined'){

              allowance.quantity = allowance.claimagainstallowance //adjust quantities
              declaration.quantity = declaration.quantity - allowance.claimagainstallowance //subtract allowance quantity from what will be declared

              allowance.value = allowance.value * (allowance.claimagainstallowance) / calculations[0].request.quantity
              declaration.value = declaration.value - allowance.value

              if(typeof allowance.weight !== 'undefined'){                                                           //and weights, if required
                
                  allowance.weight = (allowance.weight * (allowance.claimagainstallowance / calculations[0].request.quantity))    //reduce the weight in proportion
                  declaration.weight -= allowance.weight
              }
            }
            else if(typeof allowance.weight !== 'undefined'){                                                        //just adjust weight
                allowance.weight = (allowance.weight * (allowance.claimagainstallowance / calculations[0].request.weight)) 
                declaration.weight -= allowance.weight

                allowance.value = allowance.value * (allowance.claimagainstallowance) / calculations[0].request.weight
                declaration.value = declaration.value - allowance.value
               
            }
           delete allowance.customsvalue
           delete allowance.currencyconversion
           delete allowance.dutyperunit
           delete allowance.allowance
           delete allowance.savingagainstallowance
           delete allowance.claimagainstallowance

           delete declaration.customsvalue
           delete declaration.currencyconversion
           delete declaration.dutyperunit
           delete declaration.allowance
           delete declaration.savingagainstallowance
           delete declaration.claimagainstallowance

            returnedObject.allowances.push(allowance)
            if((declaration.quantity > 0)||(declaration.weight >0))
              declarations.push(declaration)


            calculations.shift() 



        } while((calculations.length > 0)&&((allowances['cigarettes'] > 0)||(allowances['cigarillos'] > 0)||(allowances['cigars'] > 0)||(allowances['tobacco'] > 0)))

      //add any remaining items to 'declarations'

      for(let i =0; i< calculations.length;i++){
        delete calculations[i].request.customsvalue
        delete calculations[i].request.currencyconversion
        delete calculations[i].request.dutyperunit
        delete calculations[i].request.allowance
        delete calculations[i].request.savingagainstallowance
        delete calculations[i].request.claimagainstallowance
        declarations.push(calculations[i].request)
      }

      convert(declarations)
      .then(conversionResults =>{
        return calculate(conversionResults)
      })
      .then(calculationResults =>{
        returnedObject.declarations = calculationResults
        resolve(returnedObject)
      })
      .catch( error =>{
        logger.error(error)
      })

      
    })
    .catch(error =>{
          logger.error(error)
    })
  }))
}
  

const getItemLimit = (commoditycode,commoditycodequalifier,allowances) => {
  for(let a in allowances){
    let allowance = allowances[a];
    const regex = new RegExp(allowance.commoditycode)
    const match = commoditycode.match(regex);
    
  
   
    if(match &&(match[0]!== "")){
      
      if((typeof allowance.commoditycodequalifier !== 'undefined')&&(allowance.commoditycodequalifier === commoditycodequalifier)){

        return ({
        "limit":allowance.limit,
        "against": a
        })
      }
      else if(typeof allowance.commoditycodequalifier === 'undefined')
        return {
        "limit":allowance.limit,
        "against": a
        }
    }
  }

}

const getItemAllowanceTobaccoCategory = (commoditycode,commoditycodequalifier,allowances) => {
  for(let a in allowances){
    let allowance = allowances[a];
    const regex = new RegExp(allowance.commoditycode)
    const match = commoditycode.match(regex);
    
  
   
    if(match &&(match[0]!== "")){
      
      if((typeof allowance.commoditycodequalifier !== 'undefined')&&(allowance.commoditycodequalifier === commoditycodequalifier)){

        return a
      }
      else if(typeof allowance.commoditycodequalifier === 'undefined')
        return a
    }
  }

}


const calculate = (calculationRequests) => {
  return(new Promise((resolve, reject) => {
    const calculations = calculationRequests.map( calculationRequest =>{
      return(applyMeasures(matchMeasures(calculationRequest.commoditycode),calculationRequest))
    })



    Promise.all(calculations).then(calcs => {
      resolve(calcs)

    })
    .catch(error =>{
      logger.error(error)
    })

  }))
  
}



const applyMeasures = (matchingmeasures, request) => {

  return (new Promise((resolve, reject) => { 
     let calculation = {
          "request": request,
          "excise":{
            "total":0.0,
            "elements":[]
          },
          "import":{
            "total": 0.0,
            "elements":[]
          },
          "vat":{
            "total":0.0,
            "elements":[]
          },
          "total": 0.0

      }

      let importMeasures = matchingmeasures.filter(measure => measure.taxtype === 'import')
                                      .filter(measure => typeof(measure.conditions) === 'undefined'||measure.conditions.call(null,request))



      importMeasures = importMeasures.sort((a,b) =>{
        if(a.series < b.series)return(-1)
        if(a.series > b.series)return(1)
        return(0)

      })


      const appliedImportCalculations = importMeasures.map(importMeasure =>{
        return(importMeasure.calculation.call(null,calculation, request, importMeasure))
      })

      Promise.all(appliedImportCalculations).then(elements =>{
        calculation.import.elements = elements
        
        
        let exciseMeasures = matchingmeasures.filter(measure => measure.taxtype === 'excise')
                                      .filter(measure => typeof(measure.conditions) === 'undefined'||measure.conditions.call(null,request))



        exciseMeasures = exciseMeasures.sort((a,b) =>{
          if(a.series < b.series)return(-1)
          if(a.series > b.series)return(1)
          return(0)

        })

      
        const appliedExciseCalculations = exciseMeasures.map(exciseMeasure =>{
          return(exciseMeasure.calculation.call(null,calculation, request, exciseMeasure))
        })

        Promise.all(appliedExciseCalculations).then(elements => {
          calculation.excise.elements = elements
              //filter measures to produce an array of matching measures which have either no conditions, or conditions which are met w.r.t the current request
          let vatMeasures = matchingmeasures.filter(measure => measure.taxtype === 'VAT')
                                          .filter(measure => typeof(measure.conditions) === 'undefined'||measure.conditions.apply(null,[calculation,request,measure]))

          vatMeasures = vatMeasures.sort((a,b) =>{
            if(a.series < b.series)return(-1)
            if(a.series > b.series)return(1)
            return(0)

          })

          //get an array of promises for each calculation
          const appliedVATCalculations = vatMeasures.map(vatMeasure => {
          
            return(vatMeasure.calculation.call(null,calculation, request, vatMeasure))

          })

        
          Promise.all(appliedVATCalculations).then(elements =>{
            calculation.vat.elements = elements
            resolve(calculation)
          })

          
        })


        
      })
      .catch(error =>{
            logger.error(error)
      })


     
  }))
}





const matchMeasures = (commodityCode) => {
  let matchingMeasures = [];

  for(let i=0; i< measures.length; i++){
    
    const regex = new RegExp(measures[i].commoditycode)
    const match = commodityCode.match(regex);
   
    if(match &&(match[0]!== ""))matchingMeasures.push(measures[i])

  }

 
  return(matchingMeasures)

}






const getProducts = () =>{
  return new Promise ((resolve, reject) => {
    const products = nconf.get("products")
    resolve(products)
  })

}

const getCountries = () =>{
 
  return new Promise ((resolve, reject) => {
    resolve(nconf.get('countries'))

  })
}

const getEUCountries = () =>{
  return new Promise ((resolve, reject) => {
    resolve(nconf.get('euMembers'))

  })
}

const isEUMember = (country) => {
  if(nconf.get("euMembers").indexOf(country) != -1)return(true)
    else return(false)
}

const getCurrencies = () =>{
 
  return new Promise ((resolve, reject) => {
    resolve(nconf.get('currencies'))

  })
}






module.exports = Object.assign({}, {getProducts, getCountries, isEUMember,getCurrencies, calculate, convert, allocateAllowances})