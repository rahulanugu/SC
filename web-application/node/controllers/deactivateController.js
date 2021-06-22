const express = require("express");
const router = express.Router();
const { check,body,validationResult } = require('express-validator');
const fs = require('fs');
var aes256 = require('aes256');
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
const connection = require('../db_connection');

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
    const query = 'SELECT * FROM `patients` WHERE Email=?';
    // req.body.Email+'"';
    connection.query(query,[req.body.email], function(err, row) {
        if(!err) {
            if (row.length>0){
                const query1 = 'DELETE FROM `patients` WHERE Email=?';
                // req.body.Email+'"';
                const retrievedPatient = row[0];
                connection.query(query1,[req.body.email], function(err, row1) {
                    if(err){
                        res.status(500).json({"message": "account could not be deactivated due to an error"});
                        next();
                    }else{
                        var query4= "INSERT INTO `deactivatedPatients` (";
                        var val = [];
                        for(var myKey in retrievedPatient) {
                            query4+=myKey+", ";
                            val.push(req.body[myKey]);
                        }
                        //val = val.slice(0,-1);
                        //val += ']';
                        query4 = query4.slice(0,query4.length-2);
                        query4+= ") VALUES (";
                        for(var myKey in retrievedPatient) {
                            /*if(retrievedPatient[myKey]==false || retrievedPatient[myKey]==true)
                                query4+="@"+myKey+",";
                            else*/
                            query4+="?,";
                        }
                        query4 = query4.slice(0,query4.length-1);
                        query4 += ")";
                        //console.log(query4);
                        connection.query(query4,val, function(err, row) {
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
    const query = 'SELECT * FROM `healthcareProviders` WHERE email=?';
    // req.body.Email+'"';
    connection.query(query,[req.body.email], function(err, row) {
        if(!err) {
            if (row.length>0){
                const query1 = 'DELETE FROM `healthcareProviders` WHERE email=?';
                // req.body.Email+'"';
                const retrievedHealthcareProvider = row[0];
                connection.query(query1,[req.body.email], function(err, row1) {
                    if(err){
                        res.status(500).json({"message": "account could not be deactivated due to an error"});
                        next();
                    }else{
                        delete retrievedHealthcareProvider['phone'];
                        var query= "INSERT INTO `deactivatedHealthcareProviders` VALUES ("
                        var val = [];
                        for(var myKey in retrievedHealthcareProvider) {
                          query+="?,";
                          val.push(retrievedHealthcareProvider[myKey]);
                        }
                        query = query.slice(0,query.length-1);
                        query += ")";
                        console.log(query);
                        connection.query(query,val, function(err, row) {
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
