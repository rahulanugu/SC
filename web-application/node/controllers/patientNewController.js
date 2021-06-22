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
const connection = require('../db_connection');
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
var aes256 = require('aes256');
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
    const query= 'SELECT * FROM `patientsnew` WHERE email=?';
    // req.body.email+'"';
    connection.query(query,[req.body.email], async function(err, row) {
      if(!err) {
          if (row.length>0){
            return res.status(400).send({
                message: 'User already exists'
            })
          }else{
            console.log("email does not exist");
            const tokeBody = req.body;
            const token = await jwt.sign({tokeBody}, "santosh", { expiresIn: 180 });
            var idToken = randtoken.generate(16);
            var json = {
              '_id': generateId(10),
              fname: req.body.firstName,
              lname: req.body.lastName,
              email: req.body.email,
              phone: req.body.phone,
            };
            var query1= "INSERT INTO `patientsnew` VALUES ("
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
                  var encryptedToken = Utility.EncryptToken(token);
                  sendVerificationMail(req.body.email,req.body.fname,encryptedToken);
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

const sendVerificationMail = (email,fname,encryptedToken)=>{

  //create a transporter with OAuth2
  const transporter = nodemailer.createTransport({
      service : 'gmail',
      auth: {
        type: "OAuth2",
        user: "moh@scriptchain.co",
        clientId: "903951478096-uctvse753g68mcaqi4js4sjsop0er655.apps.googleusercontent.com",
        clientSecret: "hV7VOphz0TaymfhnqdHl2YV7",
        refreshToken: "1//04hhUv6ftNOYdCgYIARAAGAQSNwF-L9IrPTW3kLuczISTY3UZZ7gt2UlCe107O4_9isZIJcTGP2HQaAN9SRMONRc49jMxxehAOf4",
        accessToken: accessToken
   }
  });

  //  create mail option with custom template, verification link and Json Web Token
  const mailOptions = {
      from: 'noreply@scriptchain.co',
      to: email,
      subject: 'NO REPLY AT SCRIPTCHAIN.CO! Hey it\'s Moh from ScriptChain',
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
        <h1 align="center"style="font-family: arial;">YOU'RE ALMOST DONE REGISTERING!</h1>
        <p class="para">Hi `+fname+`,</p>
        <p class="para">Welcome to ScriptChain! We are glad that you have registered, there is just one more step to verify your account. <b>Please click the link below to verify your email address.</b></p>
      <p align="center"><a href="http://scriptchain.co/patientlogin?verify=`+encryptedToken+ `?API_KEY=` + API_KEY + `"><button>Verify Your E-mail Address</button></a></p><br><br>
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
