const { httpStatus } = require('../helpers/httpResponses')
const logger = require('../controllers/loggerController')

const getHealthCheck = async (req, res) => {
  try {
    const healthCheckResponse = getHealthCheckResponse()
    return res.send(healthCheckResponse)
  } catch (error) {
    return res.status(500).send(httpStatus[500])
  }
}

const getHealthCheckResponse = () => {
  logger.info('healthCheckController -- getHealthCheckResponse')
  return {
    status: 'The API is working. No problems have been detected.',
    developed_by: 'Vinicius de Oliveira'
  }
}

module.exports = { getHealthCheck }
