const express = require("express");
const router = express.Router();
const { check,body,validationResult } = require('express-validator');
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
var aes256 = require('aes256');
const API_KEY = "scriptChain@13$67ahi1";
const key = "hosenkinosumabeni";
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
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
    console.log("reached deacivate patient controller");
    const query = 'SELECT * FROM `scriptchain-259015.dataset1.patients` WHERE Email=@email';
    // req.body.Email+'"';
    const bigQueryOptions = {
      query: query,
      params: {email:req.body.email}
    }
    bigquery.query(bigQueryOptions, function(err, row) {
        if(!err) {
            if (row.length>0){
                const query1 = 'DELETE FROM `scriptchain-259015.dataset1.patients` WHERE Email=@email';
                // req.body.Email+'"';
                const retrievedPatient = row[0];
                const bigQueryOptions1 = {
                  query: query1,
                  params: {email:req.body.email}
                }
                bigquery.query(bigQueryOptions1, function(err, row1) {
                    if(err){
                        res.status(500).json({"message": "account could not be deactivated due to an error"});
                        next();
                    }else{
                        var query4= "INSERT INTO `scriptchain-259015.dataset1.deactivatedPatients` (";
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
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
    console.log("reached deactivate controller");

    const query = 'SELECT * FROM `scriptchain-259015.dataset1.healthcareProviders` WHERE email=@email';
    // req.body.Email+'"';
    const bigQueryOptions = {
      query: query,
      params: {email:req.body.email}
    }
    bigquery.query(bigQueryOptions, function(err, row) {
        if(!err) {
            if (row.length>0){
                const query1 = 'DELETE FROM `scriptchain-259015.dataset1.healthcareProviders` WHERE email=@email';
                // req.body.Email+'"';
                const retrievedHealthcareProvider = row[0];
                console.log(retrievedHealthcareProvider);
                const bigQueryOptions1 = {
                  query: query1,
                  params: {email:req.body.email}
                }
                bigquery.query(bigQueryOptions1, function(err, row1) {
                    if(err){
                        res.status(500).json({"message": "account could not be deactivated due to an error"});
                        next();
                    }else{
                        delete retrievedHealthcareProvider['phone'];
                        var query= "INSERT INTO `scriptchain-259015.dataset1.deactivatedHealthcareProviders` VALUES ("
                        for(var myKey in retrievedHealthcareProvider) {
                          query+="@"+myKey+",";

                        }
                        query = query.slice(0,query.length-1);
                        query += ")";
                        console.log(query);
                        const bigQueryOptions = {
                            query: query,
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
