const { httpStatus } = require('../helpers/httpResponses')
const logger = require('./loggerController')

const getRoot = async (req, res) => {
  try {
    const rootResponse = getRootResponse()
    return res.send(rootResponse)
  } catch (error) {
    return res.status(500).send(httpStatus[500])
  }
}

const getRootResponse = () => {
  logger.info('rootController -- getRootResponse')
  return {
    application: 'Converter API'
  }
}

module.exports = { getRoot }
