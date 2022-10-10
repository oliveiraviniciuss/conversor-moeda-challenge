const express = require('express')
const router = express.Router()
const rootController = require('../controllers/rootController')

router
  .route('/')
  .get(rootController.getRoot)

module.exports = router
