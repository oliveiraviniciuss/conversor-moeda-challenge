const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { validate } = require('../middlewares/controllerValidation')
const conversionService = require('../controllers/conversionController')

router
  .route('/')
  .get(
    validate('query', {
      price: Joi.number().positive().required(),
      currencies: Joi.string().required()
    }),
    conversionService.getConversion
  )

module.exports = router
