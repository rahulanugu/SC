const nodemailer = require("nodemailer");
const express = require("express");
const { check,body, validationResult } = require('express-validator');
const router = express.Router();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const log = console.log;
const bcrypt = require('bcryptjs');
var aes256 = require('aes256');
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
const connection = require('../db_connection');

/**
 * Method to edit the first name of the patient
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */

router.put("/fname", [check('email').isEmail(),
check('fname').isAlpha().notEmpty(),body().custom(body => {
  const keys = ['email','fname'];
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
  //const retrievedPatient = await Patient.findOne({ Email: req.body.email })

  const query = 'SELECT * FROM `patients` WHERE Email=?';
    // req.body.email+'"';
    connection.query(query,[req.body.email], function(err, row) {
      if(!err) {
        if (row.length>0){
          //console.log(row);
          const retrievedPatient = row[0];
          retrievedPatient.fname = req.body.fname;
          const query1 = 'DELETE FROM `patients` WHERE Email=?';
          // req.body.email+'"';
          connection.query(query1,[req.body.email], function(err, row1) {
              if(err){
                  res.status(500).json({"message": "account could not be deactivated due to an error"});
                  next();
              }else{
                //console.log('deleted');

                var patient = retrievedPatient;
                var query3= "INSERT INTO `patients` (";
                var val = [];
                for(var myKey in patient) {
                  query3+=myKey+", ";
                  val.push(patient[myKey]);
                }
                query3 = query3.slice(0,query3.length-2);
                query3+= ") VALUES (";
                for(var myKey in patient) {
                    query3+="?,";
                }
                query3 = query3.slice(0,query3.length-1);
                query3 += ")";
                connection.query(query3,val, function(err, row) {
                    if(!err) {
                      res.status(200).json({ "message": "Succesfully updatted the patient record in the database" });
                    }else{
                      res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
                  }
                });
              }
            });
          }
        }else{
          res.status(404).json({ "messsage": "Email not found" })
        }
      });
});

/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.put("/lname",[check('email').isEmail(),check('lname').isAlpha().notEmpty(),body().custom(body => {
  const keys = ['email','lname'];
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
  const query = 'SELECT * FROM `patients` WHERE Email=?';
    // req.body.email+'"';
    connection.query(query,[req.body.email], function(err, row) {
      if(!err) {
        if (row.length>0){
          //console.log(row);
          const retrievedPatient = row[0];
          retrievedPatient.lname = req.body.lname;
          const query1 = 'DELETE FROM `patients` WHERE Email=?';
          // req.body.email+'"';
          connection.query(query1,[req.body.email], function(err, row1) {
              if(err){
                  res.status(500).json({"message": "account could not be deactivated due to an error"});
                  next();
              }else{
                //console.log('deleted');
                var patient = retrievedPatient;
                var query3= "INSERT INTO `patients` (";
                var val = [];
                for(var myKey in patient) {
                  query3+=myKey+", ";
                  val.push(patient[myKey]);
                }
                query3 = query3.slice(0,query3.length-2);
                query3+= ") VALUES (";
                for(var myKey in patient) {
                  query3+="?,";
                }
                query3 = query3.slice(0,query3.length-1);
                query3 += ")";
                  connection.query(query3,val, function(err, row) {
                    if(!err) {
                      res.status(200).json({ "message": "Succesfully updatted the patient record in the database" });
                    }else{
                      res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
                  }
                });
              }
            });
          }
        }else{
          res.status(404).json({ "messsage": "Email not found" })
        }
      });

});

/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.put("/phone", [check('email').isEmail(),check('phone').isMobilePhone().notEmpty(),body().custom(body => {
  const keys = ['email','phone'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  const query = 'SELECT * FROM `patients` WHERE Email=?';
    // req.body.email+'"';
    connection.query(query,[req.body.email], function(err, row) {
      if(!err) {
        if (row.length>0){
          const retrievedPatient = row[0];
          retrievedPatient.phone = req.body.phone;
          const query1= 'DELETE FROM `patients` WHERE Email=?';
          // req.body.email+'"';
          connection.query(query1,[req.body.email], function(err, row1) {
              if(err){
                  res.status(500).json({"message": "account could not be deactivated due to an error"});
                  next();
              }else{
                var patient = retrievedPatient;
                var query3= "INSERT INTO `patients` (";
                for(var myKey in patient) {
                  query3+=myKey+", ";
                }
                query3 = query3.slice(0,query3.length-2);
                query3+= ") VALUES (";
                var val =[];
                for(var myKey in patient) {
                  query3+="?,";
                  val.push(patient[myKey]);
                }
                query3 = query3.slice(0,query3.length-1);
                query3 += ")";
                connection.query(query3,val, function(err, row) {
                    if(!err) {
                      res.status(200).json({ "message": "Succesfully updatted the patient record in the database" });
                    }else{
                      res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
                  }
                });
              }
            });
          }
        }else{
          res.status(404).json({ "messsage": "Email not found" })
        }
      });

});
module.exports = router;

/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.put("/password" , [check('email').isEmail()
,check('newPassword').notEmpty(),check('oldPassword').notEmpty(),body().custom(body => {
  const keys = ['email','newPassword','oldPassword'];
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
  console.log("Trying to edit the password of the user")
  console.log(req.body.email);
  console.log(req.body)
  const query = 'SELECT * FROM `patients` WHERE Email=?';
    // req.body.email+'"';
    connection.query(query,[req.body.email], async function(err, row) {
      if(!err) {
        if (row.length>0){
          //console.log(row);
          const retrievedPatient = row[0];
          const validpassword = await bcrypt.compare(req.body.oldPassword, retrievedPatient.password);
          if (!validpassword){
            return res.status(401).json({
              message: "The old password that has been entered is incorrect"
            });
          }
          if (validpassword) {
            console.log("The entered old password is correct");
            console.log(req.body.newPassword);
            const salt = await bcrypt.genSaltSync(10);
            const hashpassword = await bcrypt.hash(req.body.newPassword, salt);
            retrievedPatient.password = hashpassword;
            const query1 = 'DELETE FROM `patients` WHERE Email=?';
            // req.body.email+'"';
            connection.query(query1,[req.body.email], function(err, row1) {
                if(err){
                    res.status(500).json({"message": "account could not be deactivated due to an error"});
                    next();
                }else{
                  //console.log('deleted');
                  var patient = retrievedPatient;
                var query3= "INSERT INTO `scriptchain-259015.dataset1.patients` (";
                var val = [];
                for(var myKey in patient) {
                  query3+=myKey+", ";
                  val.push(patient[myKey]);
                }
                query3 = query3.slice(0,query3.length-2);
                query3+= ") VALUES (";
                for(var myKey in patient) {
                  query3+="?,";
                }
                query3 = query3.slice(0,query3.length-1);
                query3 += ")";
                connection.query(query3,val, function(err, row) {
                    if(!err) {
                      res.status(200).json({ "message": "Succesfully updatted the patient record in the database" });
                    }else{
                      res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
                  }
                });
              }
            });
          }
        }
        }else{
          res.status(404).json({ "messsage": "Email not found" })
        }
      });
});


const oauth2Client = new OAuth2(
  "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
  "ZYdS8bspVNCyBrSnxkMxzF2d",
  "https://developers.google.com/oauthplayground"
);

const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email, fname) => {

  //create a transporter with OAuth2
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: "moh@scriptchain.co",
      clientId: "867282827024-auj9ljqodshuhf3lq5n8r79q28b4ovun.apps.googleusercontent.com",
      clientSecret: "zjrK7viSEMoPXsEmVI_R7I6O",
      refreshToken: "1//04OyV2qLPD5iYCgYIARAAGAQSNwF-L9IrfYyKF4kF_HhkGaFjxxnxdgxU6tDbQ1l-BLlOIPtXtCDOSj9IkwiWekXwLCNWn9ruUiE",
      accessToken: accessToken
    }
  });

  //  create mail option with custom template, verification link and Json Web Token
  const mailOptions = {
    from: 'noreply@scriptchain.co',
    to: email,
    subject: 'NO REPLY AT SCRIPTCHAIN.CO! Password successfully changed.',
    html:
      `<!DOCTYPE html>
            <html lang="en">
            <head>
              <title>Bootstrap Example</title>
              <meta charset="utf-8">
            <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto">
              <style>
              .panelFooter{
                  font-family: 'Roboto';
                  background-color: #f2f5df;
                  padding-top: 4px;
                  padding-bottom: 4px;
                  border-bottom-left-radius: 15px;
                  border-bottom-right-radius: 15px;
              }
                .container1{
                  width: 100%;
                  font-family: 'Roboto';
                  background-color: #00acc1;
                  padding-top: 8px;
                  padding-bottom: 8px;
                  border-top-left-radius: 12px;
                  border-top-right-radius: 12px;
                }
                h2{
                  color: white;
                font-family: 'Roboto', serif;
                }
            h1{
                  font-family: 'Roboto', serif;
            }
                .para{
                  font-family: 'Roboto';
                  margin-left: 16px;
                  margin-right: 16px;
                }
                .container{
                  max-width: 280px;
                  margin: 0 auto;
                  padding: 0;
              }
                @media only screen and (min-width:480px){
                  body{
                    margin-left: 20px;
                    margin-right: 20px;
                  }
                  .container{
                    max-width: 600px;
                  }
                  .content-body{
                    padding-top: 60px;
                  }
                  .content-body-text{
                    max-width: 400px;
                    margin: 0 auto;
                  }
                }
              </style>
            </head>
            <body>
            <div class="container">
              <div class="container1">
                  <h2 align="center">Alert from ScriptChain</h2>
              </div>
              <h1 align="center">Successfully updated your password.</h1>
              <p class="para">Hi ` +
      fname +
      `,</p>
              <p class="para">It seems that you have recently changed your password for your patient account. <br/>Please reach out to customer-care@scriptchain.co immediately if it is not you.</p>
               <br><br>
             <div class="panelFooter">
                <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
              </div>
            </div>
            </body>
            </html>`
  };

  // send email
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      // res.json({err});
      console.log(err);
    }
    transporter.close();
    return log('Email sent!!!');
  });
}
module.exports = router;
