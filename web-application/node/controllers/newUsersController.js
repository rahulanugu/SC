const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

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
const {BigQuery} = require('@google-cloud/bigquery');
const { compareSync } = require("bcryptjs");
const bigquery = new BigQuery();
var aes256 = require('aes256');
const API_KEY = "scriptChain@13$67ahi1";
const key = "hosenkinosumabeni";


/**
 * Method to save a new rew request access user
 * Input: Body, Contains the details specified in te NewRequesttAccessUser schema
 * Output: The status of the save operation
 *         200 - Succesfully saved the request
 *         500 - Couldnot complete the request of saving the new request access user
 */
function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}
router.post("/",[check('fname').notEmpty().isAlpha(),check('lname').notEmpty().isAlpha(),check('email').notEmpty().isEmail(),check('typeOfUser').notEmpty(),body().custom(body => {
  const keys = ['_id','fname','lname','email','typeOfUser'];
  return Object.keys(body).every(key => keys.includes(key));
})],async (req, res) => {
  //console.log(req.query);
  //var encrypted = aes256.encrypt(key, API_KEY);
  //console.log(encrypted);
  const e = validationResult(req);
  console.log(e+"test");
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  const query = 'SELECT * FROM `scriptchain-259015.dataset1.newUsers` WHERE email=@email';
  // req.body.email+'"';
  const bigQueryOptions = {
    query: query,
    params: {email:req.body.email}
  }
  bigquery.query(bigQueryOptions, function(err, rows) {
    if(!err) {
      if(rows.length>0){
        console.log('test1');
        return res.status(200).json({
          message: "Email is already registered"
        });
      }else{
        req.body['_id'] = generateId(10);

        var query4= "INSERT INTO `scriptchain-259015.dataset1.newUsers` (";
        for(var myKey in req.body) {
            query4+=myKey+", ";
        }
        query4 = query4.slice(0,query4.length-2);
          query4+= ") VALUES (";
          for(var myKey in req.body) {
              if(req.body[myKey]==false || req.body[myKey]==true)
                  query4+="@"+myKey+",";
      
              else
                  query4+="@"+myKey+","
      
          }
          query4 = query4.slice(0,query4.length-1);
          query4 += ")";
          console.log(query4);
          const bigQueryOptions4 = {
            query: query4,
            params:req.body
          }
          bigquery.query(bigQueryOptions4, function(err, row) {
            if(!err) {
              res.status(200).json({
                message: "Your message has been saved"
              });
              mailer(req.body.fname, req.body.email);
            }else{
              console.log(err);
              console.log("error in saving requested access user");
              res.status(500).send({ messsage: "An error has occured trying to execute the request" })
            }
          });
        }
    }
  });
  

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
});

module.exports = router;
