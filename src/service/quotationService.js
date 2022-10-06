const { httpStatus } = require('../helpers/httpResponses')
const axios = require('axios')

const getQuotation = async (req, res) => {
    try {

        const price = req.query.price
        const currencies = req.query.currencies
        const convertedPrices = await convertedValues(price, currencies)  

        return res.send(convertedPrices)
    }
    catch (error) {
        console.log('quotationService --- getQuitation --- error: ', error)
        return res.status(500).send(httpStatus[500])
    }
}

const convertedValues = async (price, currencies) => {

    response = await axios.get(process.env.BASE_URL);
    return response.data
}


module.exports = {
    getQuotation
}