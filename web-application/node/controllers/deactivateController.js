const express = require("express");
const router = express.Router();
const { check,body,validationResult } = require('express-validator');
const fs = require('fs');
var aes256 = require('aes256');

const db_utils = require('../db_utils');

const API_KEY = process.env.API_KEY;
const key = process.env.KEY;

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
    const e = validationResult(req);
    if (!e.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'});
    }

    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted!=API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    console.log("reached deacivate patient controller");
    // Get patient from DB
    db_utils.getRowByEmail('patients', req.body.email).then(resp => {
      if (resp.statusCode != 200) {
        return res.status(resp.statusCode).json({message: resp.message});
      }
      const retrievedPatient = resp.body;
      // Patient found, copy patient over to `deactivatedPatients` table
      db_utils.insertUserIntoDB('deactivatedPatients', retrievedPatient).then(respo => {
        if (respo.statusCode != 200) {
          return res.status(respo.statusCode).json({message: respo.message});
        }
        // Insert successful, delete patient from `patients` table
        db_utils.deleteUserFromDB('patients', req.body.email).then(respon => {
          let body = respon.body;
          body['message'] = respon.message;
          return res.status(respon.statusCode).json(body);
        });
      });
    });
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
    const e = validationResult(req);
    if (!e.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'});
    }
    
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }
    
    console.log("reached deactivate controller");
    
    // Get provider from DB
    db_utils.getRowByEmail('healthcareProviders', req.body.email).then(resp => {
      if (resp.statusCode != 200) {
        return res.status(resp.statusCode).json({message: resp.message});
      }
      const retrievedHealthcareProvider = resp.body;
      // Provider found, copy provider over to `deactivatedHealthcareProviders` table
      db_utils.insertUserIntoDB('deactivatedHealthcareProviders', retrievedHealthcareProvider).then(respo => {
        if (respo.statusCode != 200) {
          return res.status(respo.statusCode).json({message: respo.message});
        }
        // Insert successful, delete provider from `healthcareProviders` table
        db_utils.deleteUserFromDB('healthcareProviders', req.body.email).then(respon =>{
          if (respon.statusCode != 200) {
            return res.status(respon.statusCode).json({message: respon.message});
          }
          let body = respon.body;
          body['message'] = respon.message;
          return res.status(respon.statusCode).json(body);
        });
      });
    });
});

module.exports = router;
