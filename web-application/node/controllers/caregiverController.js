/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations
 */
const nodemailer = require('nodemailer');
const log = console.log;
const express = require('express');
const { check,body,validationResult } = require('express-validator');
const router = express.Router();
var aes256 = require('aes256');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

var Utility = require('../utility');
const mailer_oauth = require('../mailer_oauth');
const db_utils = require('../db_utils');

const API_KEY = process.env.API_KEY;
const key = process.env.KEY;

// get list of all patients
/**
 * Retrieve all the patients from the db
 * Input: N/A
 * Output: All the patientts in the database or error
 *         200 - Succesfully retrieved all the patients in the database
 *         404 - No patients in the database
 */
function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

router.post("/",[
  check('firstName').notEmpty(),
  check('lastName').notEmpty(),
  check('email').notEmpty().isEmail(),
  check('phone').notEmpty(),
  body().custom(body => {
    const keys = ['firstName','lastName','email','phone'];
    return Object.keys(body).every(key => keys.includes(key));
  })], 
  async (req, res) => {
    console.log('test');
    
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    db_utils.checkForUserInDB('caregivers', req.body.email).then(userExists =>{
      if (userExists) {
        return res.status(400).send({
          message: 'User already exists'
        });
      }
      console.log("Email does not exist");
      
      const data = {
        '_id': generateId(10),
        fname: req.body.firstName,
        lname: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        employer: req.body.employer
      };
  
      db_utils.insertDataIntoDB('caregivers', data).then(resp => {
        let body = resp.body;
        body['message'] = resp.message;
        return res.status(resp.statusCode).json(body);
      });
    });
})

/* Mailer */

const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();


module.exports = router;
