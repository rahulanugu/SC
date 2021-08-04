const express = require("express");
const router = express.Router();
const { check, body } = require('express-validator');
const nodemailer = require("nodemailer");

const mailer_oauth = require('../utils/mailer_oauth');
const db_utils = require('../utils/db_utils');
const sec_utils = require('../utils/security_utils');
//const {BigQuery} = require('@google-cloud/bigquery');
//const bigquery = new BigQuery();

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';
  
  for(var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

/**
 * Method to save a new rew request access user
 * Input: Body, Contains the details specified in te NewRequesttAccessUser schema
 * Output: The status of the save operation
 *         200 - Succesfully saved the request
 *         400 - User already exists
 *         500 - DB error, Could not complete the request
 */
router.post("/", [
  check('fname').notEmpty().isAlpha(),
  check('lname').notEmpty().isAlpha(),
  check('email').notEmpty().isEmail(),
  check('typeOfUser').notEmpty(),
  body().custom(body => {
    const keys = ['fname','lname','email','typeOfUser'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const user = req.body;
    // Check for user in newUsers table in db
    const userExists = await db_utils.checkForUserInDB('newUsers', user.email);
    if (userExists) {
      return res.status(400).json({message: "Email is already registered to an existing user"});
    }

    user['_id'] = generateId(10);
    // Add user to db
    const resp = await db_utils.insertUserIntoDB('newUsers', user);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    //mailer(req.body.fname, req.body.email);
    return res.status(200).json(user);
});
  

  const oauth2Client = mailer_oauth.getClient();
  const accessToken = oauth2Client.getAccessToken();
  /**
 * Mailer for sending the emails
 * @param {First name of reciever} fname
 * @param {Destination of Email} email
 */
const mailer = (fname, email) => {
  //create a transporter with OAuth2
  const transporter = nodemailer.createTransport({
    service: "gmail",
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
    from: "noreply@scriptchain.co",
    to: email,
    subject: "Hey it's Moh from ScriptChain",
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
              @media only screen and (min-width:480px){
                .container{
                  max-width: 600px;
                }
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
            <h1 align="center">We're thrilled to hear from you!</h1>
            <p class="para">Hi ` +
      fname +
      `,</p>
            <p class="para">We have received your submission to request access for ScriptChain platform and someone from the team will keep you updated once we get closer to launch. Thank you!</p>
        <br><br>
            <div class="panelFooter">
              <p align="center">This message was sent from ScriptChain LLC., Boston, MA</p>
            </div>
          </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error occurs");
      console.log(err);
    }
    transporter.close();
    console.log("Email sent!!!");
    console.log(data);
  });
};

module.exports = router;
