const express = require('express')
const app = express()

const conversion = require('./conversion')
const healthCheck = require('./healthCheck')

app.use('/conversion', conversion)
app.use('/healthcheck', healthCheck)
module.exports = app
