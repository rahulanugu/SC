// package import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// local import
const { mongoose } = require('./db');
var patientController = require('./controllers/patientController');

var app = express();

// configure express middleware to send date to nodejs project
app.use(bodyParser.json());

// allow cors to access port that angular app runs on
app.use(cors({
    origin: 'http://localhost:4200'
}));

// start express server
app.listen(3000, () => console.log('Server started at port: 3000'));

// add router from patient controller
app.use('/patient', patientController);