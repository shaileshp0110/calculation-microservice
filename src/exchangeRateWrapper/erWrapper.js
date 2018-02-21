'use strict'


const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger
const request = require ('request')

const convert = (baseCurrency, targetCurrency, value) => {

  return new Promise ((resolve, reject) => {
    const url = nconf.get('conversionserviceurl');
    const headers = {
      'User-Agent': 'Mozilla/5.0'
    }

     const options = {
      url: url + baseCurrency,
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
        const rates = JSON.parse(body)
        const rate = rates.rates[targetCurrency]
        const convertedValue = rate * value
        
          
        resolve({"basecurrency": baseCurrency,"targetcurrency": targetCurrency,"rate": rate,"value": value,"convertedvalue": convertedValue})
      }
    })

  })
}

module.exports = Object.assign({}, {convert})
