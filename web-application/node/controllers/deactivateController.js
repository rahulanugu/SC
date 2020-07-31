const express = require("express");
const router = express.Router();
const { Patient } = require('../models/user');
const { check,body,validationResult } = require('express-validator');
const { HealthcareProvider } = require('../models/healthcareProvider');
const { DeactivatedPatient } = require('../models/deactivatedUser');
const { DeactivatedHealthcareProvider } = require('../models/deactivatedHealthcareProvider');
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
const { table } = require("console");
const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);

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
// doubt
router.post("/patient",[check('Email').notEmpty().isEmail(),body().custom(body => {
  const keys = ['Email'];
  return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Some extra parameters are sent')], async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
    console.log("reached deacivate patient controller");
    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.patients` WHERE Email=@Email';
    // req.body.Email+'"';
    const bigQueryOptions = {
      query: query,
      location: 'US',
      params: {Email:req.body.Email}
    }
    bigquery.query(bigQueryOptions, function(err, row) {
        if(!err) {
            if (row.length>0){
                const query1 = 'DELETE FROM `scriptchainprod.ScriptChain.patients` WHERE Email=@Email';
                // req.body.Email+'"';
                const retrievedPatient = row[0];
                const bigQueryOptions1 = {
                  query: query1,
                  location: 'US',
                  params: {Email:req.body.Email}
                }
                bigquery.query(bigQueryOptions1, function(err, row1) {
                    if(err){
                        res.status(500).json({"message": "account could not be deactivated due to an error"});
                        next();
                    }else{
                        const filename = 'deactivatePatientsTmp.json';
                        const datasetId = 'ScriptChain';
                        const tableId = 'deactivatedPatients';
                        fs.writeFileSync(filename, JSON.stringify(retrievedPatient));

                        const table = bigquery.dataset(datasetId).table(tableId);

                        // Check the job's status for errors
                        //const errors = job.status.errors;
                        table.load(filename,(err,res1) =>{
                            if (err && err.length > 0) {
                                console.log("Error occured in deactivate controller"+err);
                                res.status(500).json({"message": "account could not be deactivated due to an error"});
                                console.log('Error in saving patient: ' + JSON.stringify(err, undefined, 2));
                            }else{
                                //console.log(`Job ${job.id} completed.`);
                                res.status(200).json({
                                    "message":"account has been deactivated"
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(404).json({"messsage": "An account could not be found with the email provided"})
            }
    }
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

//Update the code
router.post("/healthcare",[check('email').notEmpty().isEmail(),body().custom(body => {
  const keys = ['email'];
  return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Some extra parameters are sent')],async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
    console.log("reached deacivate controller");

    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.healthcareProviders` WHERE email=@email';
    // req.body.Email+'"';
    const bigQueryOptions = {
      query: query,
      location: 'US',
      params: {email:req.body.email}
    }
    bigquery.query(bigQueryOptions, function(err, row) {
        if(!err) {
            if (row.length>0){
                const query1 = 'DELETE FROM `scriptchainprod.ScriptChain.healthcareProviders` WHERE email=@email';
                // req.body.Email+'"';
                const retrievedHealthcareProvider = row[0];
                console.log(retrievedHealthcareProvider);
                const bigQueryOptions1 = {
                  query: query1,
                  location: 'US',
                  params: {email:req.body.email}
                }
                bigquery.query(bigQueryOptions1, function(err, row1) {
                    if(err){
                        res.status(500).json({"message": "account could not be deactivated due to an error"});
                        next();
                    }else{
                        const filename = 'deactivateHealthcareProvidersTmp.json';
                        const datasetId = 'ScriptChain';
                        const tableId = 'deactivatedHealthcareProviders';
                        delete retrievedHealthcareProvider['phone'];

                        fs.writeFileSync(filename, JSON.stringify(retrievedHealthcareProvider));

                        const table = bigquery.dataset(datasetId).table(tableId);

                        // Check the job's status for errors
                        //const errors = job.status.errors;
                        table.load(filename,(err,res1) =>{
                            if (err && err.length > 0) {
                                console.log("Error occured in deactivate controller"+err);
                                res.status(500).json({"message": "account could not be deactivated due to an error"});
                                console.log('Error in saving healthcare provider: ' + JSON.stringify(err, undefined, 2));
                            }else{
                                //console.log(`Job ${job.id} completed.`);
                                res.status(200).json({
                                    "message":"account has been deactivated"
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(404).json({"messsage": "An account could not be found with the email provided"})
            }
    }
    });

});

module.exports = router;
