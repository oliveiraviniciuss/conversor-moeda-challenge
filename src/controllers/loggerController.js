const { createLogger, transports } = require('winston')
require('dotenv').config()

const isLoggerSilent = () => {
  if (process.env.NODE_ENV === 'test') {
    return true
  }
  return false
}

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console()
  ],
  silent: isLoggerSilent()
})

module.exports = logger
