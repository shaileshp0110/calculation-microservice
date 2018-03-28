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
  "taxtype":"vat",
  "taxtypecode":"",
  "shortdescription":"UK VAT Standard Rate",
  "description": "UK VAT Standard Rate",
  "ratetype":"ad valorum",
  "rate":0.2,
  "unit":"%",
  "series":3,
  "conditions": request => {
    if((request.commoditycode == "62000000")&&(request.commoditycodequalifier == "children"))return(false); else return(true)
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
  "series":2

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
  "series":2

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
           
  }

    
}


]

module.exports = Object.assign({}, {measures})