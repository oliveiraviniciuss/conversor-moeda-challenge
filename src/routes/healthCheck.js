const express = require('express')
const router = express.Router()
const healthCheckService = require('../service/healthCheckService')

router
  .route('/')
  .get(healthCheckService.getHealthCheck)

module.exports = router
