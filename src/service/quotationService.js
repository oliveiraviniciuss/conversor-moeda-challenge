const { httpStatus } = require('../helpers/httpResponses')
const axios = require('axios')

const getQuotation = async (req, res) => {
    try {

        const price = req.query.price
        const currencies = req.query.currencies
        const validCurrenciesArr = getValidCurrenciesData(currencies)
        const currenciesQuotations = await getQuotationFromExternalApi(validCurrenciesArr)
        
        const convertedPrice = getPricesFromQuotationsResponse(price, currenciesQuotations, validCurrenciesArr)  
        return res.send(convertedPrice)
    }
    catch (error) {
        console.log('quotationService --- getQuitation --- error: ', error)
        return res.status(500).send(httpStatus[500])
    }
}

const getQuotationFromExternalApi = async (currencies) => {

    const validCurrenciesStr = getValidCurrenciesString(currencies)
    const url = getUrlToRequest(process.env.BASE_URL, validCurrenciesStr)
    response = await axios.get(url);
    return response.data
}

const getValidCurrenciesData = (currencies) => {
    const validCurrencies = ["EUR", "USD", "INR"]
    const receivedCurrenciesArr = currencies.toUpperCase().split(',')
    const validatedCurrenciesArr = []
    for (const currency of receivedCurrenciesArr) {
        const obj = {
            currency: currency, 
            valid: false
        }
        if (validCurrencies.includes(currency)){
           obj.valid = true
        }
        validatedCurrenciesArr.push(obj)
    }
    return validatedCurrenciesArr
}


const getPricesFromQuotationsResponse = (price, externalApiResponse, validCurrenciesArr) => {
    const newResponse = {
        invalidParams: []
    }
    for (obj of validCurrenciesArr){
        apiCurrencyFormat = `${obj.currency}BRL`
        if (obj.valid && externalApiResponse[apiCurrencyFormat]){
            currencyObj = {
                price: (price * externalApiResponse[apiCurrencyFormat].high).toFixed(2)
            }
            newResponse[obj.currency] = currencyObj
        }
        else {
            newResponse.invalidParams.push(obj.currency)
        }
    }
    return newResponse
}

const getValidCurrenciesString = (currenciesObjArr) => {
    const validCurrenciesArr = []
    for (obj of currenciesObjArr){
        if (obj.valid){
            validCurrenciesArr.push(obj.currency)
        }
    }
    return validCurrenciesArr.join(',')
}

const getUrlToRequest = (baseUrl, currencies) => {
    return baseUrl + currencies
}

module.exports = {
    getQuotation
}