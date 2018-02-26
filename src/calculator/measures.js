'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger
const converter = require('../exchangeRateWrapper/erWrapper.js')

const euMembers = ["DE","PL","FR","IT","RO","SE","ES","GR","HU","AT","HR","BG","CZ","NL","FI","BE","LT","DK","CY","MT","EE","PT","IE","SK","SI","LV"]

const isEUMember = country => {
  if(euMembers.indexOf(country) != -1)return(true)
    else return(false)
}

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
      calculation.vat.total = vatTotal
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

},
{
  "commoditycode":"24022[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"611",
  "shortdescription":"Cigarettes Excise Duty - Ad Valorem",
  "description":"Cigarettes Excise Duty - Ad Valorem Component",
  "ratetype":"ad valorem",
  "rate":0.165,
  "unit":"%",
  "series":2,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.quantity  * duty.rate * request.rrp//16.5% of retail value
        calculation.excise.total += dutyVal
        calculation.total += dutyVal

         let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": (duty.rate * 100)+duty.unit,
          "value": dutyVal
        }
        resolve(element)

     
      
    }))
      

  }

},
{
  "commoditycode":"24022[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"611",
  "shortdescription":"Cigarettes Excise Duty - Specific",
  "description":"Cigarettes Excise Duty - Specific Component",
  "ratetype":"flat",
  "rate":207.99, //per 1000
  "unit":"£",
  "series":2,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = duty.rate * (request.quantity / 1000) //207.99 per thousand
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
  "commoditycode":"24022[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"611",
  "shortdescription":"Cigarettes Excise Duty - MET",
  "description":"Cigarettes Excise Duty - Minimum Excise Tax",
  "ratetype":"flat",
  "rate":290.00, //268 per 1000
  "unit":"£",
  "series":3, //do this last
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = duty.rate * (request.quantity / 1000) //268 per thousand

        if(calculation.excise.total < dutyVal){ //MET is greater than the already calculated duty
          calculation.total -= calculation.excise.total //remove excise so far from  running total
          calculation.excise.total = dutyVal //set MET as excise total
          calculation.total += dutyVal//and add it to running total
        }

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
  "commoditycode":"240210[0-9]{2}",
  "taxtype":"excise",
  "taxtypecode":"615",
  "shortdescription":"Cigars Excise Duty ",
  "description":"Cigars Excise Duty",
  "ratetype":"flat",
  "rate":270.96, //270.96 per kg per 1000
  "unit":"£",
  "series":2, 
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = duty.rate * (request.weight / 1000) //270.96 per kg (weight is expressed in grammes)

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
  "commoditycode":"240210[0-9]{2}",
  "taxtype":"import",
  "taxtypecode":"R2204//99",
  "shortdescription":"Cigars 3rd Country Import Duty",
  "description":"Cigars 3rd Country Import Duty",
  "ratetype":"ad valorem",
  "rate":0.26,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //26% of  value
        calculation.import.total += dutyVal
        calculation.total += dutyVal

         let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": (duty.rate * 100)+duty.unit,
          "value": dutyVal
        }
        resolve(element)

     
      
    }))
      
  }

},
{
  "commoditycode":"24031[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"619",
  "shortdescription":"Handrolling Tobacco Excise Duty",
  "description":"Handrolling Tobacco Excise Duty",
  "ratetype":"flat",
  "rate":221.18, //per kg
  "unit":"£",
  "series":2, 
  "conditions": (request) => {
    return(request.commoditycodequalifier == 'handrolling')
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = duty.rate * (request.weight / 1000) //221.18 per kg (weight is expressed in grammes)

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
  "commoditycode":"24031[0-9]{3}",
  "taxtype":"import",
  "taxtypecode":"R1006/11",
  "shortdescription":"Smoking Tobacco 3rd Country Import Duty",
  "description":"Smoking Tobacco 3rd Country Import Duty",
  "ratetype":"ad valorem",
  "rate":0.749,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //74.9% of  value
        calculation.import.total += dutyVal
        calculation.total += dutyVal

         let element = {
          "taxtype": duty.taxtype,
          "taxtypecode": duty.taxtypecode,
          "description": duty.shortdescription,
          "rate": (duty.rate * 100)+duty.unit,
          "value": dutyVal
        }
        resolve(element)

     
      
    }))
      
  }

},
{
  "commoditycode":"24031[0-9]{3}",
  "taxtype":"excise",
  "taxtypecode":"623",
  "shortdescription":"Other Smoking Tobacco Excise Duty",
  "description":"Other Smoking Tobacco Excise Duty",
  "ratetype":"flat",
  "rate":119.13, //per kg
  "unit":"£",
  "series":2, 
  "conditions": (request) => {
    return(request.commoditycodequalifier === 'other')
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = duty.rate * (request.weight / 1000) //119.13 per kg (weight is expressed in grammes)

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

}

]

module.exports = Object.assign({}, {measures})