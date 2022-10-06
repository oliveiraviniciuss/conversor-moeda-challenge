const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validate } = require('../middlewares/controller_validation');
const quotationService = require('../service/quotationService')

router
    .route('/')
    .get(
        validate('query', {
            price: Joi.number().positive().required(),
            currencies: Joi.string().required()
        }),
        quotationService.getQuotation
    )

module.exports = router