'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger
const converter = require('../exchangeRateWrapper/erWrapper.js')

const isEUMember = (country) => {
  if(nconf.get("euMembers").indexOf(country) != -1)return(true)
    else return(false)
}



const measures = [

{
  "commoditycode":"[0-9]{8}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT Standard Rate",
  "description": "UK VAT Standard Rate",
  "ratetype":"ad valorum",
  "rate":0.2,
  "unit":"%",
  "series":3,
  "conditions": request => {
    if((request.commoditycode == "62000000")&&(request.commoditycodequalifier == "children"))return(false); else return(true)
  },
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
  "commoditycode":"22[0-9]{6}",
  "taxtype":"excise",
  "taxtypecode":"",
  "shortdescription":"Alcohol Excise Duty - Ad Valorem",
  "description":"Excise Duty for Alcohol Goods - Ad Valorem",
  "ratetype":"ad valorem",
  "rate":0.025,
  "unit":"%",
  "series":2,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //2.5% of customs value
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
  "commoditycode":"24[0-9]{6}",
  "taxtype":"excise",
  "taxtypecode":"",
  "shortdescription":"Tobacco Excise Duty - Ad Valorem",
  "description":"Excise Duty for Tobacco Goods - Ad Valorem",
  "ratetype":"ad valorem",
  "rate":0.03,
  "unit":"%",
  "series":2,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //3% of customs value
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
  "commoditycode":"[0-9]{8}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Import Duty non-excisable",
  "description": "5% import duty for non-excisable goods",
  "ratetype":"ad valorum",
  "rate":0.05,
  "unit":"%",
  "series":3,
  "conditions": request => { //Only apply to non-excisable goods
    const alcoholRegex = new RegExp("^22[0-9]{6}$")
    const tobaccoRegex = new RegExp("^24[0-9]{6}$")

    let aMatch = request.commoditycode.match(alcoholRegex)
    let tMatch = request.commoditycode.match(tobaccoRegex)
    if(aMatch && (aMatch[0] !== "")) return(false)
    if(tMatch && (tMatch[0] !== "")) return(false)
    return(true)
           
  },
  "calculation": (calculation,request, duty) => {
     return(new Promise ((resolve,reject) =>{

      const dutyTotal = duty.rate * request.customsvalue
       let element = {
        "taxtype": duty.taxtype,
        "taxtypecode": duty.taxtypecode,
        "description": duty.shortdescription,
        "rate":  (duty.rate * 100) + duty.unit,
        "value": dutyTotal
      }
      resolve(element)

    }))
    
  }

    
}


]

module.exports = Object.assign({}, {measures})