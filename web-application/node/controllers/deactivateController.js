const express = require("express");
const router = express.Router();
const { check,body,validationResult } = require('express-validator');

const db_utils = require('../db_utils');
const Utility = require('../utility');

//The controller handles the requests for deactivating user accounts

/**
 * Method to move a patient object from Patient database to DeactivatedPatient database
 * Input: Body containing the email of the patient to be deactivated
 *         Body - { email: "example@abc.com"}
 * Output: Status of the save operation
 *         200 - Successfylly deactivated the patient
 *         500 - An error occured trying to perform the request
 *         404 - Patient not found
 */
router.post("/patient", [
  check('email').notEmpty().isEmail(),
  body().custom(body => {
    const keys = ['email'];
    return Object.keys(body).every(key => keys.includes(key));
  })], 
  async (req, res) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'});
    }

    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }
    console.log("reached deacivate patient controller");
    
    // Get patient from DB
    const resp = await db_utils.getRowByEmail('patients', req.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    // Patient found, copy patient over to `deactivatedPatients` table
    const retrievedPatient = resp.body;
    const respo = await db_utils.insertUserIntoDB('deactivatedPatients', retrievedPatient);
    if (respo.statusCode != 200) {
      return res.status(respo.statusCode).json({message: respo.message});
    }
    // Insert successful, delete patient from `patients` table
    const respon = await db_utils.deleteUserFromDB('patients', req.body.email);
    let body = respon.body;
    body['message'] = respon.message;
    return res.status(respon.statusCode).json(body);
  });
  
/**
 * Method to move a patient object from HealthcareProvider database to DeactivatedHealthcareProvider database
 * Input: Body containing the email of the HealthcareProvider to be deactivated
 *         Body - { email: "example@abc.com"}
 * Output: Status of the save operation
 *         200 - Successfylly deactivated the HealthcareProvider
 *         500 - An error occured trying to perform the request
 *         404 - HealthcareProvider not found
 */
router.post("/healthcare", [
  check('email').notEmpty().isEmail(),
  body().custom(body => {
    const keys = ['email'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'});
    }
    
    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }
    console.log("reached deactivate controller");
    
    // Get provider from DB
    const resp = await db_utils.getRowByEmail('healthcareProviders', req.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    // Provider found, copy provider over to `deactivatedHealthcareProviders` table
    const retrievedHealthcareProvider = resp.body;
    const respo = await db_utils.insertUserIntoDB('deactivatedHealthcareProviders', retrievedHealthcareProvider);
    if (respo.statusCode != 200) {
      return res.status(respo.statusCode).json({message: respo.message});
    }
    // Insert successful, delete provider from `healthcareProviders` table
    const respon = await db_utils.deleteUserFromDB('healthcareProviders', req.body.email);
    let body = respon.body;
    body['message'] = respon.message;
    return res.status(respon.statusCode).json(body);
});

module.exports = router;
