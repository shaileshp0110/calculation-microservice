'use strict'

const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger

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




module.exports = Object.assign({}, {getProducts,getCountries,getCurrencies})