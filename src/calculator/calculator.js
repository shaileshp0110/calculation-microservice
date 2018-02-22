'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger

const measures = require('./measures.js').measures

const calculate = (calculationRequests) => {
  return(new Promise((resolve, reject) => {
    const calculations = calculationRequests.map( calculationRequest =>{
      return(applyMeasures(matchMeasures(calculationRequest.commoditycode),calculationRequest))
    })



    Promise.all(calculations).then(calcs => {
      resolve(calcs)

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

const getCurrencies = () =>{
 
  return new Promise ((resolve, reject) => {
    resolve(nconf.get('currencies'))

  })
}




module.exports = Object.assign({}, {getProducts,getCountries,getCurrencies, calculate})