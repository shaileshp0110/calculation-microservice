'use strict'

const nconf = require('./config/conf.js').nconf
const server = require('./server/server.js')
const logger = require('./logger/log.js').logger




let port = nconf.get('server').port

server.startServer(port)
.then((server) => {
  logger.info("server running on port: " + port)
})
.catch((error) => {
  logger.error(JSON.stringify(error))
})
