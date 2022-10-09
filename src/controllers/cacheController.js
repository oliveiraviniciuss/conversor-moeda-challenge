const NodeCache = require('node-cache')
const cacheClient = new NodeCache()
const logger = require('../controllers/loggerController')

const setCache = async (key, val) => {
  try {
    logger.info('cacheController -- setCache')
    const ttl = process.env.CACHE_TTL
    return cacheClient.set(key, val, ttl)
  } catch (error) {
    logger.error('cacheController -- setCache -- error to set memory cache')
    return error
  }
}

const getCache = async (key) => {
  try {
    logger.info('cacheController -- getCache')
    return cacheClient.get(key)
  } catch (error) {
    logger.error('cacheController -- getCache -- error to get memory cache')
    return error
  }
}

const setCacheIfNotExists = async (key, val) => {
  logger.info('cacheController -- setCacheIfNotExists')
  try {
    const response = getCache(key)
    if (!response) {
      setCache(key, val)
    }
  } catch (error) {
    logger.error('cacheController -- setCacheIfNotExists -- error to get memory cache')
    return error
  }
}

module.exports = {
  setCacheIfNotExists,
  getCache,
  setCache
}
