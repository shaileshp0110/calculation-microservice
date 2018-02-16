'use strict'

const nconf = require('../config/conf.js').nconf


const allowances = nconf.get("allowances")


const getAllowances = () => {

  return new Promise((resolve, reject) =>{
    resolve(allowances)
  })
}

module.exports = Object.assign({}, {getAllowances})