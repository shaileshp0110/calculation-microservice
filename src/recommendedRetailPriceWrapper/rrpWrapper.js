'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger
const request = require ('request')

const getRRPs = (brandName) =>{

  let products=[];
  return new Promise ((resolve, reject) => {
    const url = nconf.get('rrpserviceurl');
    const headers = {
      'User-Agent': 'Mozilla/5.0'
    }

     const options = {
      url: url + brandName,
      headers: headers

    }

    request(options, (error, resp, body) => {
      if (error) {
        const obj = {
          status: 'ERROR',
          message: error
        }
        reject(obj)
      } else if (typeof resp === 'undefined') {
        const obj = {
          status: 'ERROR',
          message: 'No response from: ' + url
        }
        reject(obj)
      } else if (resp.statusCode !== 200) {
        var obj = {
          status: 'ERROR',
          message: JSON.stringify('bad response code: ' + resp.statusCode + ' from: ' + url)
        }
        logger.error('bad response code: ' + resp.statusCode + ' from: ' + url)
        reject(obj)
      } else {
        const cheerio = require('cheerio')
        let $ = cheerio.load(body)
        $('.DetailsWrp').each((index, value) => {
          let name = $(value).find('a .Prefix').text()
          let suffix = $(value).find('a .Suffix').text()
          let price = ($(value).find('.Price').text().trim().substring(1) / 20.0).toFixed(2)
          //logger.info('name: ' + name + ' suffix: ' + suffix + "price: " + price)

          if(suffix =="(20)"){
            let product = {
              "product": name,
              "price" : +price
            }
            products.push(product)
          }
        })

        let brandData ={
          "brand":brandName.replace(new RegExp('_', 'g'), ' ').replace(' Tobacconist',''),
          "products":products
        }
        
        
       
        resolve(brandData)
      }
    })

  })
}

module.exports = Object.assign({}, {getRRPs})