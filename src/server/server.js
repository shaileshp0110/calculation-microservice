'use strict'
const express = require('express')
const logger = require('../logger/log.js').logger
const setupAPI = require('../api/api.js').setupAPI

const startServer = (port) => {
  

  return new Promise((resolve, reject) => {
    if (!port) {
      reject(new Error('No port number provided for Server'))
    }

    const app = express()

    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong, err: ' + err))
      res.status(500).send('Something went wrong')
    })

    setupAPI(app)

    const server = app.listen(port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {startServer})
