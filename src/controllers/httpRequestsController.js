const axios = require('axios')
const logger = require('../controllers/loggerController')

const httpGet = async (url) => {
  try {
    logger.info('httpRequestController - httpGet')
    return await axios.get(url)
  } catch (error) {
    logger.error('httpRequestController -- httpGet -- error from external API request')
    return error
  }
}

module.exports = {
  httpGet
}
