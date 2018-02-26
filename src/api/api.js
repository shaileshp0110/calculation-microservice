'use strict'
const nconf = require('../config/conf.js').nconf
const logger = require('../logger/log.js').logger
const status = require('http-status')
const allowances = require('../allowancesWrapper/allowanceswrapper.js')
const RRPWrapper =  require('../recommendedRetailPriceWrapper/rrpWrapper.js')
const calculator = require('../calculator/calculator.js')

const setupAPI = (app) => {
  app.get('/allowances', (req, res, next) => {
    allowances.getAllowances().then(allowances => {
      res.status(status.OK).json(allowances)
    })
    .catch(next)
  })
  app.get('/cigaretterrps', (req, res, next) => {

    const brands = nconf.get("brands")

    Promise.all(brands.map(RRPWrapper.getRRPs)).then(prices => {
      res.status(status.OK).json(prices)
    })
    .catch(next)
  })
  app.get('/products', (req, res, next) => {
    calculator.getProducts().then(products => {
      res.status(status.OK).json(products)
    })
    .catch(next)
  })
  app.get('/countries', (req, res, next) => {
    calculator.getCountries().then(products => {
      res.status(status.OK).json(products)
    })
    .catch(next)
  })
  app.get('/currencies', (req, res, next) => {
    calculator.getCurrencies().then(currencies => {
      res.status(status.OK).json(currencies)
    })
    .catch(next)
  })
  app.post('/calculate', (req, res, next) => {
    calculator.convert(req.body.calculationrequests).then(conversionResults =>{
      calculator.calculate(conversionResults).then(calculationResults =>{
          res.status(status.OK).json(calculationResults)
        })
    })
        
  })
  
  
}

module.exports = Object.assign({}, {setupAPI})
