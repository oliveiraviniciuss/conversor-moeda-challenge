const { httpStatus } = require('../helpers/httpResponses')

const getHealthCheck = async (req, res) => {
  try {
    const healthCheckResponse = getHealthCheckResponse()
    return res.send(healthCheckResponse)
  } catch (error) {
    console.log('healthCheckService --- getHealthCheck --- error: ', error)
    return res.status(500).send(httpStatus[500])
  }
}

const getHealthCheckResponse = () => {
  return {
    status: 'The API is working. No problems have been detected.',
    developed_by: 'Vinicius de Oliveira'
  }
}

module.exports = { getHealthCheck }
