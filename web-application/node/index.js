/**
 * index.js
 * Main driver of the node.js server
 * Starts the server and adds the routes created in the controllers
 */

// package import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// local import
const { mongoose } = require('./db');
var patientController = require('./controllers/patientController');
var newUserController = require('./controllers/newUsersController');
var patientloginController = require('./controllers/patientLoginController');
var verifiedController = require('./controllers/verifiedController');
var contactUsController = require('./controllers/contactUsController');
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
app.use('/patient-login',patientloginController);
app.use('/request-access', newUserController);
app.use('/verified', verifiedController);
app.use('/contact-us', contactUsController);
