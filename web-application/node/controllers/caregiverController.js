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
const connection = require('../db_connection');

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

/* Mailer */

const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();


module.exports = router;
