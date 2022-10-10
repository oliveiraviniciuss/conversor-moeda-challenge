const express = require('express')

const app = express()
const conversion = require('./conversion')
const healthCheck = require('./healthCheck')
const root = require('./root')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger/swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/conversion', conversion)
app.use('/healthcheck', healthCheck)
app.use('/', root)

module.exports = app
