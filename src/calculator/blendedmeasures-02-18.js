/*
Measures to simulate the customs/excise/VAT rates expressed in the document "Passengers Carrying Goods - proposal for simplified VAT, 
excise and customs rates for declaration at the border", dated February 2018"
*/


'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger
const converter = require('../exchangeRateWrapper/erWrapper.js')

const isEUMember = (country) => {
  if(nconf.get("euMembers").indexOf(country) != -1)return(true)
    else return(false)
}



const measures = [
/***********************
VAT
************************/

//20% Standard VAT Rate
{
  "commoditycode":"[0-9]{8}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT Standard Rate",
  "description": "UK VAT Standard Rate",
  "ratetype":"ad valorem",
  "rate":0.2,
  "unit":"%",
  "series":3,
  //Exclusions for Children's clothes, Works of Art, Books/publications, disability equipment, protective helmets
  // Smoking cessation products, feminine hygiene products
  "conditions": request => { 
    if(((request.commoditycode == "62000000")&&(request.commoditycodequalifier == "children"))
      ||(request.commoditycode == "97000000")
      ||(request.commoditycode == "49000000")
      ||(request.commoditycode == "90210000")
      ||(request.commoditycode == "65061000")
      ||(request.commoditycode == "30040000")
      ||(request.commoditycode == "96190000")
      )return(false); else return(true)
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

{ //Children's clothes 0% VAT rated
  "commoditycode":"62000000",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT Zero Rate",
  "description": "UK VAT Zero Rate",
  "ratetype":"ad valorem",
  "rate":0.0,
  "unit":"%",
  "series":3,
  //Exclusions for Children's clothes, Works of Art, Books/publications, disability equipment, protective helmets
  // Smoking cessation products, feminine hygiene products
  "conditions": request => { 
    if(request.commoditycodequalifier == "children")
      return(true)
    else return(false)
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
{ //Books and publications 0% VAT rated
  "commoditycode":"49[0-9]{6}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT Zero Rate",
  "description": "UK VAT Zero Rate",
  "ratetype":"ad valorem",
  "rate":0.0,
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
{ //Disability Equipment 0% VAT rated
  "commoditycode":"9021[0-9]{4}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT Zero Rate",
  "description": "UK VAT Zero Rate",
  "ratetype":"ad valorem",
  "rate":0.0,
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
{ //Protective Helmets 0% VAT rated
  "commoditycode":"65061[0-9]{3}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT Zero Rate",
  "description": "UK VAT Zero Rate",
  "ratetype":"ad valorem",
  "rate":0.0,
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
{ //Works of Art  5% VAT rated
  "commoditycode":"97[0-9]{6}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT 5% Rate",
  "description": "UK VAT 5% Rate",
  "ratetype":"ad valorem",
  "rate":0.05,
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
{ //Feminine Hygience Products  5% VAT rated
  "commoditycode":"9619[0-9]{4}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT 5% Rate",
  "description": "UK VAT 5% Rate",
  "ratetype":"ad valorem",
  "rate":0.05,
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
{ //Smoking Cessation  Products  5% VAT rated
  "commoditycode":"3004[0-9]{4}",
  "taxtype":"VAT",
  "taxtypecode":"",
  "shortdescription":"UK VAT 5% Rate",
  "description": "UK VAT 5% Rate",
  "ratetype":"ad valorem",
  "rate":0.05,
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
/****************************
IMPORT DUTY
****************************/
{
  "commoditycode":"24022[0-9]{3}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Cigarettes Import Duty",
  "description":"Cigarettes Import Duty",
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
  "commoditycode":"2403[0-9]{4}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Tobacco Import Duty",
  "description":"Tobacco Import Duty",
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
  "commoditycode":"24021[0-9]{3}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Cigars Import Duty",
  "description":"Cigars Import Duty",
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
  "commoditycode":"62[0-9]{6}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Children's Clothing Import Duty",
  "description":"Children's Clothing Import Duty",
  "ratetype":"ad valorem",
  "rate":0.105,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    if(request.commoditycodequalifier !== "children")return(false)
    if(isEUMember(request.origin))return(false)
    return(true)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //10.5% of  value
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
  "commoditycode":"62[0-9]{6}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Clothing Import Duty",
  "description":"Clothing Import Duty",
  "ratetype":"ad valorem",
  "rate":0.12,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    if(request.commoditycodequalifier == "children")return(false)
    if(isEUMember(request.origin))return(false)
    return(true)
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //12% of  value
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
  "commoditycode":"7013[0-9]{4}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Glassware Import Duty",
  "description":"Glassware Import Duty",
  "ratetype":"ad valorem",
  "rate":0.11,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //11% of  value
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
  "commoditycode":"6911[0-9]{4}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Porcelain Import Duty",
  "description":"Porcelain Import Duty",
  "ratetype":"ad valorem",
  "rate":0.06,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //6% of  value
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
  "commoditycode":"6403[0-9]{4}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Leather Footwear Import Duty",
  "description":"Leather Footwear Import Duty",
  "ratetype":"ad valorem",
  "rate":0.08,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //8% of  value
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
  "commoditycode":"64[0-9]{6}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Non-Leather Footwear Import Duty",
  "description":"Non-Leather Footwear Import Duty",
  "ratetype":"ad valorem",
  "rate":0.17,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    if(request.commoditycode === "64030000") return(false) //exclude leather footwear
    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //17% of  value
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
  "commoditycode":"[0-9]{8}",
  "taxtype":"import",
  "taxtypecode":"",
  "shortdescription":"Standard Blended Rate Import Duty",
  "description":"Standard Blended Rate Import Duty",
  "ratetype":"ad valorem",
  "rate":0.025,
  "unit":"%",
  "series":2,
  "conditions": (request) => {
    const alcoholRegex = new RegExp("^22[0-9]{6}$")
    const tobaccoRegex = new RegExp("^24[0-9]{6}$")
    const clothingRegex = new RegExp("^62[0-9]{6}$")
    const glasswareRegex = new RegExp("^7013[0-9]{4}$")
    const porcelainRegex = new RegExp("^6911[0-9]{4}$")
    const artworkRegex = new RegExp("^97[0-9]{6}$")
    const footwearRegex = new RegExp("^64[0-9]{6}$")

    let aMatch = request.commoditycode.match(alcoholRegex)
    let tMatch = request.commoditycode.match(tobaccoRegex)
    let cMatch = request.commoditycode.match(clothingRegex)
    let gMatch = request.commoditycode.match(glasswareRegex)
    let pMatch = request.commoditycode.match(porcelainRegex)
    let artMatch = request.commoditycode.match(artworkRegex)
    let fMatch = request.commoditycode.match(footwearRegex)

    if(aMatch && (aMatch[0] !== "")) return(false)
    if(tMatch && (tMatch[0] !== "")) return(false)
    if(cMatch && (cMatch[0] !== "")) return(false)
    if(gMatch && (gMatch[0] !== "")) return(false)
    if(pMatch && (pMatch[0] !== "")) return(false)
    if(artMatch && (artMatch[0] !== "")) return(false)
    if(fMatch && (fMatch[0] !== "")) return(false)

    return(!isEUMember(request.origin))
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = request.customsvalue  * duty.rate //17% of  value
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
/****************************
EXCISE DUTY
****************************/
{
  "commoditycode":"2208[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"451",
  "shortdescription":"Spirits Excise Duty",
  "description":"Spirits Excise Duty",
  "ratetype":"flat",
  "rate":10.77,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = request.volume  * duty.rate 
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
  "taxtypecode":"451",
  "shortdescription":"Beer Excise Duty",
  "description":"Beer Excise Duty",
  "ratetype":"flat",
  "rate":0.76,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = request.volume  * duty.rate 
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
  "commoditycode":"2206[0-9]{4}",
  "taxtype":"excise",
  "taxtypecode":"451",
  "shortdescription":"Cider Excise Duty",
  "description":"Cider Excise Duty",
  "ratetype":"flat",
  "rate":0.40,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = request.volume  * duty.rate 
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
  "taxtypecode":"451",
  "shortdescription":"Wine Excise Duty",
  "description":"Wine Excise Duty",
  "ratetype":"flat",
  "rate":2.88,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = request.volume  * duty.rate 
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
  "taxtypecode":"451",
  "shortdescription":"Sparkling Wine Excise Duty",
  "description":"Sparkling Wine Excise Duty",
  "ratetype":"flat",
  "rate":3.69,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = request.volume  * duty.rate 
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
  "taxtypecode":"451",
  "shortdescription":"Fortified Wine Excise Duty",
  "description":"Fortified Wine Excise Duty",
  "ratetype":"flat",
  "rate":3.69,
  "currency":"GBP",
  "unit":"£",
  "series":1,
  "conditions": request => { 
    return(request.commoditycodequalifier === "fortified")
     
  },
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
        const dutyVal = request.volume  * duty.rate 
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
  "shortdescription":"Cigarettes Excise Duty",
  "description":"Cigarettes Excise Duty",
  "ratetype":"flat",
  "rate":5.92, //per pack of 20
  "unit":"£",
  "series":2,
  "calculation": (calculation, request, duty) => {
    return(new Promise ((resolve, reject) => {
      const dutyVal = duty.rate * (request.quantity / 20) //5.92 per pack
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
  "taxtype":"excise",
  "taxtypecode":"615",
  "shortdescription":"Cigars Excise Duty ",
  "description":"Cigars Excise Duty",
  "ratetype":"flat",
  "rate":270.96, //270.96 per kg 
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

},

]

module.exports = Object.assign({}, {measures})