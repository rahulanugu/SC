const express = require("express");
const router = express.Router();
const { response } = require("express");
const { check, body } = require('express-validator');
const nodemailer = require("nodemailer");
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const db_utils = require('../utils/db_utils');
const mailer_oauth = require('../utils/mailer_oauth');
const sec_utils = require("../utils/security_utils");

const API_KEY = process.env.API_KEY;
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
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("Reactivating patient is being requested");
    
    // Find the patient in deactivatedPatients table
    const resp = await db_utils.getRowByEmail_('deactivatedPatients', req.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    const patient = resp.body;
    // Get JWT using id, name, email
    const tokeBody = { _id: patient._id, fname: patient.fname, email: patient.Email };
    const token = await sec_utils.EncryptToken(tokeBody, 500);
    
    // Email the token
    // sendVerificationMail(req.body.email, patient.fname, token);
    
    return res.status(200).json({message: "Email Sent"});
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
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("Reactivating healthcareprovider is being requested");
    
    // Find the healthcareprovider in deactivatedHealthcareProviders table in db
    const resp = await db_utils.getRowByEmail('deactivatedHealthcareProviders', req.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    // Get JWT using id, name, email
    const healthcareProvider = resp.body;
    const tokeBody = {_id: healthcareProvider._id, firstName: healthcareProvider.firstName, email: healthcareProvider.email};
    const tokenRes = await sec_utils.EncryptToken(tokeBody, 500);
    if (tokenRes.statusCode != 200) {
      return res.status(tokenRes.statusCode).json({message: tokenRes.message});
    }
    const token = tokenRes.body;
    // Email the token
    // sendVerificationMailHealthcare(req.body.email,healthcareProvider.firstName,token);

    return res.status(200).json({message: "Email Sent"});
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
  check("jwtToken").notEmpty(),
  body().custom(body => {
    const keys = ['jwtToken'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const decryptedRes = await sec_utils.DecryptToken(req.body.jwtToken);
    if (decryptedRes.statusCode != 200) {
      return res.status(decryptedRes.statusCode).json({message: decryptedRes.message});
    }
    console.log("Token succesfully verified");
    const decryptedToken = decryptedRes.body;

    console.log('/reactivate/patient', 'reached get');
    // Check if patient exists in deactivatedPatients table
    const resp = await db_utils.getRowByEmail_('deactivatedPatients', decryptedToken.Email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    console.log('/reactivate/patient', 'reached insert');
    // Insert into active patients table
    const patient = resp.body;
    const respo = await db_utils.insertUserIntoDB('patients', patient);
    if (respo.statusCode != 200) {
      return res.status(respo.statusCode).json({message: respo.message});
    }
    console.log('/reactivate/patient', 'reached delete');
    // Delete user from deactivatedPatients table
    const respon = await db_utils.deleteUserFromDB_('deactivatedPatients', decryptedToken.Email);
    if (respon.statusCode != 200) {
      return res.status(respon.statusCode).json({message: respon.message});
    }
    return res.status(200).json(patient)
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
  check("jwtToken").notEmpty(),
  body().custom(body => {
    const keys = ['jwtToken'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const decryptedRes = await sec_utils.DecryptToken(req.body.jwtToken);
    if (decryptedRes.statusCode != 200) {
      return res.status(decryptedRes.statusCode).json({message: decryptedRes.message});
    }
    console.log("Token succesfully verified");
    const decryptedToken = decryptedRes.body;

    console.log('/reactivate/healthcare', 'reached get');
    // Insert into active patients table
    const resp = await db_utils.getRowByEmail('deactivatedHealthcareProviders', decryptedToken.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    console.log('/reactivate/healthcare', 'reached insert');
    // Check if patient exists in deactivatedPatients table
    const retrievedHealthcareProvider = resp.body;
    for (key in retrievedHealthcareProvider) {
      if (retrievedHealthcareProvider[key] === null) delete retrievedHealthcareProvider[key];
    }
    
    console.log('retrievedHealthcareProvider', retrievedHealthcareProvider)
    const respo = await db_utils.insertUserIntoDB('healthcareproviders', retrievedHealthcareProvider);
    if (respo.statusCode != 200) {
      return res.status(respo.statusCode).json({message: respo.message});
    }
    console.log('/reactivate/healthcare', 'reached delete');
    // Delete user from deactivatedPatients table
    const respon = await db_utils.deleteUserFromDB('deactivatedHealthcareProviders', decryptedToken.email);
    if (respon.statusCode != 200) {
      return res.status(respon.statusCode).json({message: respon.message});
    }
    return res.status(200).json(retrievedHealthcareProvider)
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
      return console.log('Email sent!!!');
  });
}


module.exports = router;
