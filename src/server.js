const express = require('express');
const router = express.Router();
const app = express();

const quotation = require('./routes/quotation')

app.use('/quotation', quotation);

module.exports = app