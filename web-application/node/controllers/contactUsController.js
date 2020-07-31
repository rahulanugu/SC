const nodemailer = require("nodemailer");
const express = require("express");
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var { ContactUser } = require("../models/contactUsers");
const log = console.log;
const oauth2Client = new OAuth2(
  "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
  "ZYdS8bspVNCyBrSnxkMxzF2d",
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token:
    "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
});

const accessToken = oauth2Client.getAccessToken();

const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');

const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

router.post("/",[check('fname').notEmpty().isAlpha(),check('lname').notEmpty().isAlpha(),check('email').isEmail(),check('message').notEmpty()], async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  console.log("hello");
  req.body['_id'] = generateId(10);
  const filename = 'contactUserTmp.json';
  const datasetId = 'ScriptChain';
  const tableId = 'contactUsers';

  fs.writeFileSync(filename, JSON.stringify(req.body));

  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId).load(filename);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    res.status(500).json({
      message: "An error has occured trying to process your request"
    })
  }else{
    console.log(`Job ${job.id} completed.`);
    res.status(200).json({
      message: "Your message has been saved"
    });
  }


  /**
   * Mailer for sending the emails
   * @param {First name of reciever} fname
   * @param {Destination of Email} email
   */
  function mailer(fname, email) {
    let transporter = nodemailer.createTransport({
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
    let mailOptions = {
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
          }

            .container1{
              width: 100%;
              font-family: 'Roboto';
              background-color: #00acc1;
              padding-top: 8px;
              padding-bottom: 8px;
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
              font-size: 1.17em;
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
                background-color: white;
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
          <p class="para">We have received your submission and someone from the ScriptChain team will be in contact with you shortly. Stay tuned.</p>
           <br><br>
         <div class="panelFooter">
            <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
          </div>
        </div>
        </body>
        </html>`
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return log("Error occurs");
      }
      return log("Email sent!!!");
    });
  }
});
module.exports = router;
