const express = require('express')
const app = express()

const conversion = require('./conversion')
const healthCheck = require('./healthCheck')
const root = require('./root')

app.use('/conversion', conversion)
app.use('/healthcheck', healthCheck)
app.use('/', root)
module.exports = app
