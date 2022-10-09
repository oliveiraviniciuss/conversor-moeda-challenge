const { httpStatus } = require('../helpers/httpResponses')
const { httpGet } = require('./httpRequestsController')
const cacheService = require('./cacheController')
const logger = require('./loggerController')

const getConversion = async (req, res) => {
  try {
    logger.info('conversionController - getConversion')
    const price = req.query.price
    const paramsCurrencies = req.query.currencies
    const validCurrenciesArr = getValidCurrenciesArr(paramsCurrencies)
    const currenciesQuotations = await getQuotationFromExternalApi(validCurrenciesArr)
    const convertedPrice = await getPricesFromQuotationsResponse(price, currenciesQuotations, validCurrenciesArr)
    return res.send(convertedPrice)
  } catch (error) {
    logger.error('conversionController --- getConversion --- error: ', error)
    return res.status(500).send(httpStatus[500])
  }
}

const getQuotationFromExternalApi = async (validatedCurrencies) => {
  const validCurrenciesStr = getValidCurrenciesString(validatedCurrencies)
  const url = getUrlToRequest(process.env.BASE_URL, validCurrenciesStr)
  const response = await getQuotationValues(url, validCurrenciesStr)
  return response
}

const getValidCurrenciesArr = (paramsCurrencies) => {
  try {
    logger.info('conversionController - getValidCurrenciesArr')
    const acceptedCurrencies = ['EUR', 'USD', 'INR']
    const validatedCurrenciesArr = []
    const receivedCurrenciesArr = paramsCurrencies.toUpperCase().split(',')

    for (const currency of receivedCurrenciesArr) {
      const currencyObj = {
        currency,
        valid: false
      }
      if (acceptedCurrencies.includes(currency)) {
        currencyObj.valid = true
      }
      validatedCurrenciesArr.push(currencyObj)
    }
    return validatedCurrenciesArr
  } catch (error) {
    logger.error('conversionController --- getConversion --- error')
    return error
  }
}

const getPricesFromQuotationsResponse = async (price, externalApiResponse, validCurrenciesArr) => {
  logger.info('getPricesFromQuotationsResponse - getValidCurrenciesArr')
  try {
    const COMMON_KEY_SUFFIX = 'BRL'
    const newResponse = {
      invalidParams: []
    }

    for (const obj of validCurrenciesArr) {
      const apiCurrencyFormat = `${obj.currency}${COMMON_KEY_SUFFIX}`
      if (obj.valid && externalApiResponse[apiCurrencyFormat]) {
        const currencyObj = {
          price: (price * externalApiResponse[apiCurrencyFormat]?.high)
        }
        newResponse[obj.currency] = currencyObj
        await cacheService.setCacheIfNotExists(apiCurrencyFormat, valueToStoreInCache(externalApiResponse, apiCurrencyFormat))
      } else {
        newResponse.invalidParams.push(obj.currency)
      }
    }
    return newResponse
  } catch (error) {
    logger.error('conversionController --- getPricesFromQuotationsResponse --- error')
    return error
  }
}

const getValidCurrenciesString = (currenciesObjArr) => {
  const validCurrenciesArr = []
  for (const obj of currenciesObjArr) {
    if (obj.valid) {
      validCurrenciesArr.push(obj.currency)
    }
  }
  return validCurrenciesArr.join(',')
}

const getQuotationValues = async (url, validCurrenciesStr) => {
  const COMMON_KEY_SUFFIX = 'BRL'
  const cacheKey = `${validCurrenciesStr}${COMMON_KEY_SUFFIX}`
  let response = await cacheService.getCache(cacheKey)
  if (!response) {
    response = (await httpGet(url)).data
    await cacheService.setCache(cacheKey, response)
  }
  return response
}

const getUrlToRequest = (baseUrl, currencies) => {
  return `${baseUrl}${currencies}`
}

const valueToStoreInCache = (externalApiResponse, apiCurrencyFormat) => {
  try {
    return { [apiCurrencyFormat]: externalApiResponse[apiCurrencyFormat] }
  } catch (error) {
    logger.error('conversionController --- valueToStoreInCache --- error')
    return error
  }
}

module.exports = {
  getConversion
}
