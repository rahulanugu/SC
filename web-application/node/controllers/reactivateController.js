const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
var aes256 = require('aes256');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var jwtDecode = require('jwt-decode');
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const db_utils = require('../db_utils');
const mailer_oauth = require('../mailer_oauth');
const Utility = require("../utility");
const { response } = require("express");

const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
//The controller handles the requests for reactivating user accounts

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';
  
  for(var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

/**
 * Method to request reactivation of a patient account
 * Input: Body containg email of the user
 *        Body - {email: "example@abc.com"}
 * Output: 200 - Successfully executed the request; an email with jwt token for verification will be sent to the user
 *         400 - Bad request
 *         401 - Authorization failed
 *         404 - User not found
 */
router.post("/patient/request",[
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
      //find the patient

    console.log("Reactivating patient is being requested");
    //const patient = await DeactivatedPatient.findOne({Email : req.body.email});
    db_utils.getRowByEmail('deactivatedPatients', req.body.email).then(resp => {
      if (resp.statusCode != 200) {
        return res.status(resp.statusCode).json({message: resp.message});
      }
      const patient = resp.body;
      console.log('test');
      // generate a jwt token with email,name
      const tokeBody = { _id: patient._id, fname: patient.fname, email: patient.Email };
      const token = Utility.EncryptToken(tokeBody, 500);

      // email the token
      sendVerificationMail(req.body.email, patient.fname, token);

      return res.status(200).json({
        "message": "Email Sent"
      });
    });
});

/**
 * Method to request reactivation of a Healthcareprovider account
 * Input: Body containg email of the user
 *        Body - {email: "example@abc.com"}
 * Output: 200 - Successfully executed the request; an email with jwt token for verification will be sent to the user
 *         400 - Bad request
 *         401 - Authorization failed
 *         404 - User not found
 */
router.post("/healthcare/request", [
  check('email').notEmpty().isEmail(),
  body().custom(body => {
    const keys = ['email'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const e = validationResult(req);
    if (!e.isEmpty()) {
      return res.status(400).json({message:'Bad Request'});
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({message:'Unauthorized'});
    }
    //find the healthcareprovider
    console.log("Reactivating healthcareprovider is being requested");
    db_utils.getRowByEmail('deactivatedHealthcareProviders', req.body.email).then(resp => {
      if (resp.statusCode != 200) {
        return res.status(resp.statusCode).json({message: resp.message});
      }
      const healthcareProvider = resp.body;
      //generate a jwt token with email,name
      const tokeBody = {_id: healthcareProvider._id, firstName: healthcareProvider.firstName, email: healthcareProvider.email};
      const token = Utility.EncryptToken(tokeBody, 500);

      //email the token
      sendVerificationMailHealthcare(req.body.email,healthcareProvider.firstName,token);

      return res.status(200).json({message: "Email Sent"});
    });
});


/**
 * Method to move a patient object from DeactivatedPatient database to Patient database
 * Input: Body containg JWT token sent for verification
 *        Body - { token: "jwtToken"}
 * Output: Status of the save operation
 *         200 - Successfylly reactivated the user
 *         400 - Bad request
 *         401 - Authorization failed
 *         404 - Patient not found
 *         500 - An error occured trying to perform the request
 */
router.post("/patient/activate", [
  check("token").notEmpty(),
  body().custom(body => {
    const keys = ['token'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    //check validity of token
    const decryptedToken = Utility.DecryptToken(req.body.token);
    if (decryptedToken['error']) {
      console.log("Token verification failed")
      return res.status(401).json({
        "message": "Jwt token verification failed"
      });
    }

    console.log("Token succesfully verified");
    console.log(decryptedToken);

    //const retrievedPatient = await DeactivatedPatient.findOne({Email: decodedValue.email})
    // +'"'+decodedValue.email+'"';

    // Check if patient exists in deactivatedPatients table
    db_utils.getRowByEmail('deactivatedPatients', decryptedToken.email).then(resp => {
      if (resp.statusCode != 200) {
        return res.status(resp.statusCode).json({message: resp.message});
      }
      const patient = resp.body;
      // Insert into active patients table
      db_utils.insertUserIntoDB('patients', patient).then(respo => {
        if (respo.statusCode != 200) {
          return res.status(respo.statusCode).json({message: respo.message});
        }
        // Delete user from deactivatedPatients table
        db_utils.deleteUserFromDB('deactivatedPatients', decryptedToken.email).then(respon => {
          return res.status(respon.statusCode).json({message: respon.message});
        });
      });
    });
  });
  
  
/**
 * Method to move a healthcare provider object from DeactivatedHealthcareProvider database to HealthcareProvider database
 * Input: Body containg JWT token sent for verification
 *        Body - { toke: "jwtToken"}
 * Output: Status of the save operation
 *         200 - Successfylly reactivated the user
 *         400 - Bad request
 *         401 - Authorization failed
 *         404 - HealthcareProvider not found
 *         500 - An error occured trying to perform the request
 */
router.post("/healthcare/activate", [
  check("token").notEmpty(),
  body().custom(body => {
    const keys = ['token'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }
    //check validity of token
    const decryptedToken = Utility.DecryptToken(req.body.token);
    
    if (decryptedToken['error']) {
      console.log("Token verification failed")
      return res.status(401).json({
        "message": "Jwt token verification failed"
      });
    }
    
    console.log("Token succesfully verified")
    console.log(decryptedToken)
    
    //const retrievedHealthcareProvider = await DeactivatedHealthcareProvider.findOne({email: decodedValue.email})
    // Insert into active patients table
    db_utils.getRowByEmail('deactivatedHealthcareProviders', decryptedToken.email).then(resp => {
      if (resp.statusCode != 200) {
        return res.status(resp.statusCode).json({message: resp.message});
      }
      const retrievedHealthcareProvider = resp.body;
      // Check if patient exists in deactivatedPatients table
      db_utils.insertUserIntoDB('healthcareProviders', retrievedHealthcareProvider).then(respo => {
        if (respo.statusCode != 200) {
          return res.status(respo.statusCode).json({message: respo.message});
        }
        // Delete user from deactivatedPatients table
        db_utils.deleteUserFromDB('deactivatedHealthcareProviders', decryptedToken.email).then(respon => {
          return res.status(respon.statusCode).json({message: respon.message});
        });
      });
    });
});

const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email,fname,encryptedToken)=>{

    //create a transporter with OAuth2
    const transporter = nodemailer.createTransport({
        service : 'gmail',
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
        subject: 'NO REPLY AT SCRIPTCHAIN.CO! We have recieved a request to reactivate your patient account.',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Bootstrap Example</title>
          <meta charset="utf-8">

          <style>
          .panelFooter{
              font-family: Arial;
              background-color: #f2f5df;
              padding-top: 4px;
              padding-bottom: 4px;
              border-bottom-left-radius: 15px;
              border-bottom-right-radius: 15px;
          }
          .container{
          }
            .container1{
              width: 100%;
              font-family: arial;
              background-color: #6638e2;
              padding-top: 8px;
              padding-bottom: 8px;
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            }
            h2{
              color: white;
            }
            .para{
              font-family: Arial;
              margin-left: 16px;
              margin-right: 16px;
            }
            button{
              background-color: #6638e2; /* Green */
              border: none;
              width: 400px;
              border-radius: 10px;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 17px;
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
              <h2 align="center">Welcome to ScriptChain</h2>
          </div>
          <h1 align="center"style="font-family: arial;">We have recieved a request to Reactivate your account.</h1>
          <p class="para">Hi `+fname+`,</p>
        <p align="center"><a href="http://scriptchain.co/reactivatepatient?token=`+encryptedToken+ `?API_KEY=` + API_KEY + `"><button>Click here to reactivate</button></a></p><br><br>
        <p align="center" class="para">If you have any questions or concerns feel free to reach out to <a href="mailto:customer-care@scriptchain.co">customer-care@scriptchain.co</a></p>
          <div class="panelFooter">
            <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
          </div>
        </div>
        </body>
        </html>
        `
    }

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

const sendVerificationMailHealthcare = (email,fname,encryptedToken)=>{

  //create a transporter with OAuth2
  const transporter = nodemailer.createTransport({
      service : 'gmail',
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
      subject: 'NO REPLY AT SCRIPTCHAIN.COM!!! We have recieved a request to reactivate your healthcare-provider account.',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8">

        <style>
        .panelFooter{
            font-family: Arial;
            background-color: #f2f5df;
            padding-top: 4px;
            padding-bottom: 4px;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
        .container{
        }
          .container1{
            width: 100%;
            font-family: arial;
            background-color: #6638e2;
            padding-top: 8px;
            padding-bottom: 8px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }
          h2{
            color: white;
          }
          .para{
            font-family: Arial;
            margin-left: 16px;
            margin-right: 16px;
          }
          button{
            background-color: #6638e2; /* Green */
            border: none;
            width: 400px;
            border-radius: 10px;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 17px;
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
            <h2 align="center">Welcome to ScriptChain</h2>
        </div>
        <h1 align="center"style="font-family: arial;">We have recieved a request to Reactivate your account.</h1>
        <p class="para">Hi `+fname+`,</p>
      <p align="center"><a href="http://scriptchain.co/reactivatehealthcareprovider?token=`+encryptedToken+`"><button>Click here to reactivate</button></a></p><br><br>
      <p align="center" class="para">If you have any questions or concerns feel free to reach out to <a href="mailto:customer-care@scriptchain.co">customer-care@scriptchain.co</a></p>
        <div class="panelFooter">
          <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
        </div>
      </div>
      </body>
      </html>
      `
  }

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
