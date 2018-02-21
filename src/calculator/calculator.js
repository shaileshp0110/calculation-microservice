'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger
const converter = require('../exchangeRateWrapper/erWrapper.js')

const euMembers = ["DE","PL","FR","IT","RO","SE","ES","GR","HU","AT","HR","BG","CZ","NL","FI","BE","LT","DK","CY","MT","EE","PT","IE","SK","SI","LV"]

const measures = [
{
  "commoditycode":"[0-9]{8}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "short description":"UK VAT Standard Rate",
  "description": "UK VAT Standard Rate",
  "ratetype":"ad valorum",
  "rate":0.2,
  "unit":"%",
  "series":3,
  "calculation": (calculation,request, duty) => {
     return(new Promise ((resolve,reject) =>{
      const vatTotal = duty.rate * (request.customsvalue + calculation.excise.total + calculation.import.total)
      calculation.total += vatTotal
       let element = {
        "taxtype": duty.taxtype,
        "taxtypecode": duty.taxtypecode,
        "description": duty.shortdescription,
        "rate":  (duty.rate * 100) + duty.unit,
        "value": vatTotal
      }
      resolve(element)

    }))
    
  }

    
},
{
  "commoditycode":"2203[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"473",
  "shortdescription":"General Beer Duty",
  "description":"Imported Beer (Standard rate i.e. Annual production more than 60000 hectolitres",
  "ratetype":"flat",
  "rate":19.08,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": request => {
    
    if(request.abv > 0.028)return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
   
        const dutyVal = (request.volume /100.0) * (request.abv * 100) * duty.rate 
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    })) 


  }

},
{
  "commoditycode":"2203[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"447",
  "shortdescription":"High Strength Beer Duty",
  "description":"Imported Beer High Strength Beer Duty (applies to beer exceeding 7.5% abv) N.B. General Beer duty is also due on all imported High Strength Beer",
  "ratetype":"flat",
  "rate":5.69,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": (request) => {
    if(request.abv > 0.075)return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {

        const dutyVal = (request.volume /100.0) * (request.abv  * 100) * duty.rate 
        calculation.excise.total += dutyVal
        calculation.total += dutyVal
        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))


  }

},
{
  "commoditycode":"2203[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"447",
  "shortdescription":"Reduced Rate General Beer Duty",
  "description":"Reduced Rate of general beer duty (applies to beer exceeding 1.2% abv but not exceeding 2.8%)",
  "ratetype":"flat",
  "rate":8.42,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": (request) => {
    if((request.abv > 0.012)&&(request.abv <= 0.028))return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {

        const dutyVal = (request.volume /100.0) * (request.abv * 100) * duty.rate
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))

  }

},
{
  "commoditycode":"22041[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"412",
  "shortdescription":"Lower Strength Sparkling Wine Excise duty",
  "description":"Lower Strength Sparkling Wine Excise duty (applies to sparkling wine exceeding 5.5% abv but not exceeding 8.5%)",
  "ratetype":"flat",
  "rate":279.46,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": (request) => {
    if((request.abv > 0.055)&&(request.abv <= 0.085))return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
    
        const dutyVal = (request.volume /100.0)  * duty.rate
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))

  }

},
{
  "commoditycode":"22041[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"411",
  "shortdescription":"Mid Strength Sparkling Wine Excise duty",
  "description":"Mid Strength Sparkling Wine Excise duty (applies to sparkling wine exceeding 8.5% abv but not exceeding 15%)",
  "ratetype":"flat",
  "rate":369.72,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": (request) => {
    if((request.abv > 0.085)&&(request.abv <= 0.15))return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = (request.volume /100.0)  * duty.rate
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))


  }

},
{
  "commoditycode":"22042[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"413",
  "shortdescription":"Normal Strength Still Wine Excise duty",
  "description":"Normal Strength Still Wine Excise duty (applies to non-sparkling wine exceeding 5.5% abv but not exceeding 15%)",
  "ratetype":"flat",
  "rate":288.65,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": (request) => {
    if((request.abv > 0.055)&&(request.abv <= 0.15))return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = (request.volume /100.0)  * duty.rate
        calculation.excise.total += dutyVal
         calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))


  }

},
{
  "commoditycode":"2204[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"415",
  "shortdescription":"Strong Wine Excise duty",
  "description":"Strong Wine Excise duty (applies to all still and sparkling wine exceeding 15% abv but not exceeding 22%)",
  "ratetype":"flat",
  "rate":384.82,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": (request) => {
    if((request.abv > 0.15)&&(request.abv <= 0.22))return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = (request.volume /100.0)  * duty.rate
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))


  }

},
{
  "commoditycode":"2204[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"419",
  "shortdescription":"Extra Strong Wine Excise duty",
  "description":"Extra Strong Wine Excise duty (applies to all still and sparkling wine exceeding 22% abv)",
  "ratetype":"flat",
  "rate":28.74,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": (request) => {
    if(request.abv > 0.22)return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {

        const dutyVal = request.volume  * duty.rate * request.abv //this one is rate per litre of alchohol
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))


  }

},
{
  "commoditycode":"2208[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"451",
  "shortdescription":"Spirits Excise Duty",
  "description":"Spirits Excise Duty",
  "ratetype":"flat",
  "rate":28.74,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = request.volume  * duty.rate * request.abv //this one is rate per litre of alchohol
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "value": dutyVal
        }
        resolve(element)
    }))


  }

},
{
  "commoditycode":"22041[0-9]{3}",
  "taxtype":"import",
  "taxtypecode":"R2204//99",
  "shortdescription":"Sparkling Wine 3rd Country Import Duty",
  "description":"Sparkling Wine 3rd Country Import Duty",
  "ratetype":"flat",
  "rate":32.0,
  "currency":"EUR",
  "unit":"€",
  "series":2,
  "conditions": (request) => {
    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyValEur = (request.volume /100.0)  * duty.rate //32 Euros per hectolitre
      converter.convert("EUR","GBP",dutyValEur).then( conversion => {
        calculation.import.total += conversion.convertedvalue
         calculation.total += conversion.convertedvalue

        let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "currencyvalue": dutyValEur,
          "conversionrate": conversion.rate,
          "value": conversion.convertedvalue
        }
        resolve(element)

      }) 

    }))
      
     


  }

},
{
  "commoditycode":"22041[0-9]{3}",
  "taxtype":"import",
  "taxtypecode":"D0238//98",
  "shortdescription":"Sparkling Wine Import Duty Tariff - Turkey",
  "description":"Sparkling Wine Import Duty Tarriff - Turkey",
  "ratetype":"flat",
  "rate":6.4,
  "currency":"EUR",
  "unit":"€",
  "series":2,
  "conditions": (request) => {
      if(request.origin === "TR")return(true); else return(false)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyValEur = (request.volume /100.0)  * duty.rate //6.4 Euros per hectolitre
      converter.convert('EUR',"GBP",dutyValEur).then(conversion =>{
        calculation.import.total += conversion.convertedvalue
        calculation.total += conversion.convertedvalue

         let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": duty.unit + duty.rate,
          "currencyvalue": dutyValEur,
          "conversionrate": conversion.rate,
          "value": conversion.convertedvalue
        }
        resolve(element)

      })
      
    }))
      

  }

}


]
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


const isEUMember = country => {
  if(euMembers.indexOf(country) != -1)return(true)
    else return(false)
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