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
const jwt = require('jsonwebtoken');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const randtoken = require('rand-token');
var Utility = require('../utility');
const oauth2Client = new OAuth2(
    "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
    "ZYdS8bspVNCyBrSnxkMxzF2d",
    "https://developers.google.com/oauthplayground"
);
var mysql = require('mysql');
oauth2Client.setCredentials({
    refresh_token:
      "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
  });
const accessToken = oauth2Client.getAccessToken();
var aes256 = require('aes256');
const API_KEY = "scriptChain@13$67ahi1";
const key = "hosenkinosumabeni";

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

var connection = mysql.createConnection({
  host: 'database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Scriptchain20!',
  port: 3306,
  database: 'scriptchain'
});

router.post("/",[check('firstName').notEmpty(),check('lastName').notEmpty(),
check('email').notEmpty().isEmail(),check('phone').notEmpty(),body().custom(body => {
  const keys = ['firstName','lastName','email','phone'];
  return Object.keys(body).every(key => keys.includes(key));
})], async(req, res) => {
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  console.log('test');
  var ip = req.connection.remoteAddress;
  console.log(ip+" "+req.body.email);
    //Check if user alread exists
    const query= 'SELECT * FROM `caregivers` WHERE email=?';
    // req.body.email+'"';
    connection.query(query,[req.body.email], async function(err, row) {
      if(!err) {
          if (row.length>0){
            return res.status(400).send({
                message: 'User already exists'
            })
          }else{
            console.log("email does not exist")
            var idToken = randtoken.generate(16);
            var json = {
              '_id': generateId(10),
              fname: req.body.firstName,
              lname: req.body.lastName,
              email: req.body.email,
              phone: req.body.phone,
              employer: req.body.employer
            };
            var query1= "INSERT INTO `caregivers` VALUES ("
            var val = [];
            //REPLACE THIS AFTER VALUES
            for(var myKey in json) {
              query1+="?,";
              val.push(json[myKey]);
            }
            query1 = query1.slice(0,query1.length-1);
            query1 += ")";
            connection.query(query1,val, function(err, row) {
              if(!err) {
                  console.log('Inserted successfully');
                  res.status(200).json({
                    "message":"Success"
                  });
              }else{
                console.log(err);
              }
            })
          }
        }else{
          console.log(err);
          //res.status(500).send({message: "An error has occured trying to send the mail"});
        }
    });
})


module.exports = router;
