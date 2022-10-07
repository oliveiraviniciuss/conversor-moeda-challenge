const nodeCache = require('node-cache')
const cacheClient = new nodeCache()

const setCache = (key, val) => {
  const ttl = process.env.CACHE_TTL
  return cacheClient.set(key, val, ttl)
}

const getCache = (key) => {
  return cacheClient.get(key)
}

const setCacheIfNotExists = (key, val) => {
  const response = getCache(key)
  if (!response) {
    setCache(key, val)
  }
}

module.exports = {
  setCacheIfNotExists,
  getCache,
  setCache
}
