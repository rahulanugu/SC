const express = require('express');
var router = express.Router();
const { check,body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

const mailer_oauth = require('../mailer_oauth');
const db_utils = require('../db_utils');
var Utility = require('../utility');

const API_KEY = process.env.API_KEY;
//The controller is used for generating a JWT token to initiate a password reset request

/**
 * Generate a JWT token for user/patient object and save it in db
 * Also, email user with password reset page link with jwt token
 * Input: User/Patient email
 * Output: 401 - Email not found (or) 200 - Email has been sent
 */
router.post('/', [
  check('email').notEmpty().isEmail(),
  body().custom(body => {
    const keys = ['email'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'});
    }
    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }
    // Get patient from db
    const resp = await db_utils.getRowByEmail('patients', req.body.email);
    if (resp.statusCode != 200 || resp.body.length === 0) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    const patient = resp.body[0];
    const encryptedToken = Utility.EncryptToken(patient, 120);
    // Email the token
    //sendVerificationMail(req.body.email, patient.fname, encryptedToken);
    return res.status(200).json({
      message: "Email has been sent to reset password"
    });
});

/**
 * Verify the jwt token and return the if valid or not
 * Input: JWT 
 * Output: 200 - JWT verified
 *         400 - Bad request
 *         401 - Authorization failed
 */
router.post('/check',[
  check("token").notEmpty(),
  body().custom(body => {
    const keys = ['token'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }

    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }

    const decryptedToken = Utility.DecryptToken(req.body.token);
    if (decryptedToken['error']) {
      return res.status(401).json({message: decryptedToken['error_message']});
    }
    return res.status(200).json({
      message: "JWT is verified"
    });
});

/**
 * Change user password in db, verifying JWT first
 * Input: JWT, new password
 * Output: 200 - Password successfully updated
 *         400 - Bad request
 *         401 - Authorization failed
 *         500 - DB error
 */
router.post('/change_password',[
  check("token").notEmpty(),
  check("password").notEmpty(),
  body().custom(body => { 
    const keys = ['token','password'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }

    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }

    const decryptedToken = Utility.DecryptToken(req.body.token);
    if (decryptedToken['error']) {
      return res.status(401).json({message: decryptedToken['error_message']});
    }
    console.log("Reached change password")
    console.log(decryptedToken);
    
    // JWT is verified
    // decryptedToken will contain the user json object
    
    // Get patient from db
    const resp = await db_utils.getRowByEmail('patients', decryptedToken.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    console.log('Selected');
    const patient = resp.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    patient['password'] = hashpassword;
    // Update patient info in db
    const respo = await db_utils.updateUserInfoInDB('patients', patient);
    return res.status(respo.statusCode).json({message: respo.message});
});

const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email, fname, encryptedToken) => {
  console.log(fname);
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
    subject: 'NO REPLY AT SCRIPTCHAIN.CO! We have recieved a request to reset password.',
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
          }
          .container{
          }
            .container1{
              width: 100%;
              font-family: arial;
              background-color: #6638e2;
              padding-top: 8px;
              padding-bottom: 8px;
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
              width: 150px;
              height: 40px;
              border-radius: 10px;
              color: white;
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
            	background-color: grey;
              }
              .container{
                max-width: 600px;
            	background-color: white;
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
          <h1 align="center"style="font-family: arial;">Please follow the link to reset your password</h1>
          <p class="para">Hi `+ fname + `,</p>
        <p align="center"><a href="http://scriptchain.co/patient/password/resetpage?token=`+ encryptedToken + `?email=` + email + `?API_KEY=` + API_KEY + `"><button>Reset Password</button></a></p><br><br>
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
