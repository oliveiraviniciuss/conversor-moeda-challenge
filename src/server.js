const express = require('express')
const app = express()

const conversion = require('./routes/conversion')

app.use('/conversion', conversion)

module.exports = app
