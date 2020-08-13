const express = require("express");
const router = express.Router();
const { check,body,validationResult } = require('express-validator');
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
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
/*

*/
router.post("/patient",[check('email').notEmpty().isEmail(),body().custom(body => {
    const keys = ['email'];
    return Object.keys(body).every(key => keys.includes(key));
  })], async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
    console.log("reached deacivate patient controller");
    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.patients` WHERE Email=@email';
    // req.body.Email+'"';
    const bigQueryOptions = {
      query: query,
      location: 'US',
      params: {email:req.body.email}
    }
    bigquery.query(bigQueryOptions, function(err, row) {
        if(!err) {
            if (row.length>0){
                const query1 = 'DELETE FROM `scriptchainprod.ScriptChain.patients` WHERE Email=@email';
                // req.body.Email+'"';
                const retrievedPatient = row[0];
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
                        var query4= "INSERT INTO `scriptchainprod.ScriptChain.deactivatedPatients` (";
                        for(var myKey in retrievedPatient) {
                            query4+=myKey+", ";
                        }
                        query4 = query4.slice(0,query4.length-2);
                        query4+= ") VALUES (";
                        for(var myKey in retrievedPatient) {
                            if(retrievedPatient[myKey]==false || retrievedPatient[myKey]==true)
                                query4+="@"+myKey+",";

                            else
                                query4+="@"+myKey+",";

                        }
                        query4 = query4.slice(0,query4.length-1);
                        query4 += ")";
                        console.log(query4);
                        const bigQueryOptions2 = {
                            query: query4,
                            location: 'US',
                            params: retrievedPatient
                        }
                        bigquery.query(bigQueryOptions2, function(err, row) {
                            if(!err) {
                                console.log("In deactivateController[patient, POST]: Inserted successfully");;
                                res.status(200).json({
                                    "message":"account has been deactivated"
                                });
                            }else{
                            console.log(err);
                            res.status(500).json({
                                "message": "account could not be deactivated due to an error"
                            })
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
/*

*/
router.post("/healthcare",[check('email').notEmpty().isEmail(),body().custom(body => {
    const keys = ['email'];
    return Object.keys(body).every(key => keys.includes(key));
  })],async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
    console.log("reached deactivate controller");

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
                        delete retrievedHealthcareProvider['phone'];
                        var query= "INSERT INTO `scriptchainprod.ScriptChain.deactivatedHealthcareProviders` VALUES ("
                        for(var myKey in retrievedHealthcareProvider) {
                          query+="@"+myKey+",";

                        }
                        query = query.slice(0,query.length-1);
                        query += ")";
                        console.log(query);
                        const bigQueryOptions = {
                            query: query,
                            location: 'US',
                            params:retrievedHealthcareProvider
                        }
                        bigquery.query(bigQueryOptions, function(err, row) {
                            if(!err) {
                                console.log("In deactivateController[healthcare, POST]: Inserted successfully");;
                                res.status(200).json({
                                    "message":"account has been deactivated"
                                });
                            }else{
                            console.log(err);
                            res.status(500).json({
                                "message": "account could not be deactivated due to an error"
                            })
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
