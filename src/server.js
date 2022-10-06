const express = require('express');
const router = express.Router();
const app = express();

const conversion = require('./routes/conversion')

app.use('/conversion', conversion);

module.exports = app