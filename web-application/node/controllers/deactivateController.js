const express = require("express");
const router = express.Router();
const { check, body } = require('express-validator');

const db_utils = require('../db_utils');
const sec_utils = require('../security_utils');

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
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    
    console.log('/deactivate/patient', 'reached get');
    // Get patient from DB
    const resp = await db_utils.getRowByEmail('patients', req.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }

    console.log('/deactivate/patient', 'reached insert');
    // Patient found, copy patient over to `deactivatedPatients` table
    const retrievedPatient = resp.body;
    const respo = await db_utils.insertUserIntoDB('deactivatedPatients', retrievedPatient);
    if (respo.statusCode != 200) {
      return res.status(respo.statusCode).json({message: respo.message});
    }

    console.log('/deactivate/patient', 'reached delete');
    // Insert successful, delete patient from `patients` table
    const respon = await db_utils.deleteUserFromDB_('patients', req.body.email);
    if (respon.statusCode != 200) {
      return res.status(resp.statusCode).json({message: respz.message});
    }
    return res.status(200).json(retrievedPatient);
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
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    
    console.log('/deactivate/healthcare', 'reached get');
    // Get provider from DB
    const resp = await db_utils.getRowByEmail('healthcareproviders', req.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    console.log('/deactivate/healthcare', 'reached insert');
    // Provider found, copy provider over to `deactivatedHealthcareProviders` table
    const retrievedHealthcareProvider = resp.body;
    const respo = await db_utils.insertUserIntoDB('deactivatedHealthcareProviders', retrievedHealthcareProvider);
    if (respo.statusCode != 200) {
      return res.status(respo.statusCode).json({message: respo.message});
    }
    console.log('/deactivate/healthcare', 'reached delete');
    // Insert successful, delete provider from `healthcareproviders` table
    const respon = await db_utils.deleteUserFromDB('healthcareproviders', req.body.email);
    if (respon.statusCode != 200) {
      return res.status(respon.statusCode).json({message: respon.message});
    }
    return res.status(200).json(retrievedHealthcareProvider);
});

module.exports = router;
