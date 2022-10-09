const express = require('express')
const router = express.Router()
const healthCheckService = require('../controllers/healthCheckController')

router
  .route('/')
  .get(healthCheckService.getHealthCheck)

module.exports = router
