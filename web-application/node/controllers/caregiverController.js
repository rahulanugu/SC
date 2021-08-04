/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations
 */
const nodemailer = require('nodemailer');
const log = console.log;
const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();

const mailer_oauth = require('../utils/mailer_oauth');
const db_utils = require('../utils/db_utils');
const sec_utils = require('../utils/security_utils');

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

/**
 * Add caregiver to the db
 * Input: First name, last name, email, phone #
 * Output: Newly created caregiver, barring errors
 *         200 - Succesfully retrieved all the patients in the database
 *         400 - Validation failed/ user already exists
 *         404 - No patients in the database
 */
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
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    // Check for caregiver in db
    const userExists = await db_utils.checkForUserInDB('caregivers', req.body.email);
    if (userExists) {
      return res.status(400).send({message: 'User already exists'});
    }
    console.log("Email does not exist");
    
    const user = {
      _id: generateId(10),
      fname: req.body.firstName,
      lname: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      employer: req.body.employer
    };
    // Add caregiver to db
    const resp = await db_utils.insertDataIntoDB('caregivers', user);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(user);
})

/* Mailer */

const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();


module.exports = router;
