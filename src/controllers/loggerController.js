const { createLogger, transports } = require('winston')
const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console()
  ]
})

module.exports = logger
