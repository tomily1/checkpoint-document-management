const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup the app
var app = express();
var router = express.Router();
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
