const { httpStatus } = require('../helpers/httpResponses')

const getQuotation = async (req, res) => {
    try {
        return res.send({hello: "world"})
    }
    catch (error) {
        console.log('quotationService --- getQuitation --- error: ', error)
        return res.status(500).send(httpStatus[500])
    }
}

module.exports = {
    getQuotation
}