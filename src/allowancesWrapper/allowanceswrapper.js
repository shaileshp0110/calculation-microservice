'use strict'

const nconf = require('../config/conf.js').nconf


const allowances = nconf.get("allowances")


const getAllowances = (code) => {

  return new Promise((resolve, reject) =>{
    if(code)resolve(allowances[code])
    else resolve(allowances)
  })
}


module.exports = Object.assign({}, {getAllowances})