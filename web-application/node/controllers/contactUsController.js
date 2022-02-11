// const express = require("express");
// const router = express.Router();
// const { check, body } = require('express-validator');

// const db_utils = require('../utils/db_utils');
// const sec_utils = require('../utils/security_utils');
// const sendEmail = require("./sendEmail");

// function generateId(count) {
//   var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
//   var str = '';

//   for(var i = 0; i < count; i++) {
//       str += _sym[parseInt(Math.random() * (_sym.length))];
//   }
//   return str;
// }

// /**
//  * Method to save the customer query to the database
//  * Input: Details of ContactUser as specified in schema
//  * Output: Status of the save operation
//  *         200 - Successfylly saved the request
//  *         400 - Bad request
//  *         401 - API Key invalid
//  *         500 - An error occured trying to save the request
//  */
// router.post("/contact-us", [
//   check('fname').notEmpty().isAlpha(),
//   check('lname').notEmpty().isAlpha(),
//   check('email').isEmail(),
//   check('message').notEmpty(),
//   body().custom(body => {
//     const keys = ['fname','lname','email','message'];
//     return Object.keys(body).every(key => keys.includes(key));
//   })],
//   async (req, res) => {
//     // Validate API request
//     const validate = sec_utils.APIRequestIsValid(req);
//     if (validate.statusCode != 200) {
//       return res.status(validate.statusCode).json({message: validate.message});
//     }
//     const user = req.body;
//     user['_id'] = generateId(10);
//     // Add user object into contactUsers table
//     const resp = await db_utils.insertUserIntoDB('contactUsers', user);
//     if (resp.statusCode != 200) {
//       return res.status(resp.statusCode).json({message: resp.message});
//     }

//     sendEmail(req.body.email, "Thank You for Contacting ScriptChain!", "./emailTemplates/contactConfirmation-email.html");

    const user = req.body;
    user['_id'] = generateId(10);
    // Add user object into contactUsers table
    console.log("Test "); 
    //const resp = await db_utils.insertUserIntoDB('contactUsers', user);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }


//     return res.status(200).json(user);
// });

// module.exports = router;

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express.Router();

 app.use(bodyParser.json({limit: '50mb'}));
 app.use(express.static('public'));

var connection = mysql.createConnection({
host: 'database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com',
user: 'admin',
password: 'Scriptchain21',
port: 3306,
database: 'scriptchain'
});
connection.connect();

 app.post('/contact_us', function(req, res, next) {
 var cope = req.body;
 console.log('request received:', req.body);
var query = connection.query('insert into cope set ?', cope, function (err,     result) {
 if (err) {
     console.error(err);
     return res.send(err);
 } else {
     return res.send('Ok');
 }
  });
});
module.exports = app;
