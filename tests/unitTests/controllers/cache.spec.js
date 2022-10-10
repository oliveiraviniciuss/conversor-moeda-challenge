const expect = require('chai').expect
require('dotenv').config()
const cache = require('../../../src/controllers/cacheController')

describe('Testing cache controller', () => {

  const key = 'BRLUSD'
  const dataToStore = {
    price: 10,
  }
    it('should return empty because not exists value in cache', async  () => {
      const result = await cache.getCache(key)
      expect(result).to.be.undefined
    })

    it('should return data because we are saving in cache before', async  () => {
      await cache.setCache(key, dataToStore)
      const result = await cache.getCache(key)
      expect(result).to.be.deep.equal(dataToStore)
    })

    it('should return data because we are using the function get or set cache', async  () => {
      await cache.setCacheIfNotExists(key, dataToStore)
      const result = await cache.getCache(key)
      expect(result).to.be.deep.equal(dataToStore)
    })

})
