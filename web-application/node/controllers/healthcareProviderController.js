/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations
 */
const nodemailer = require('nodemailer');
const log = console.log;
const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TokenSchema} = require('../models/tokeSchema');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const randtoken = require('rand-token');
var Utility = require('../utility')
var jwtDecode = require('jwt-decode');


//Creating a new oauthclientt for mailing
const oauth2Client = new OAuth2(
    "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
    "ZYdS8bspVNCyBrSnxkMxzF2d",
    "https://developers.google.com/oauthplayground"
);

//Seting credentials for oauthclient
oauth2Client.setCredentials({
    refresh_token:
      "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
});

// retrieve an access token from oauthclient
const accessToken = oauth2Client.getAccessToken();
var aes256 = require('aes256');
const API_KEY = "scriptChain@13$67ahi1";
const key = "hosenkinosumabeni";
/**
 * Request the creation of a new healthcareprovider user
 * Input: Body, contains the details that are specified in healthcare provider data model
 * Output: 200 - Success status, and the email is sent
 *         500 - Error status
 *         400 - Already exists
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Scriptchain20!',
  port: 3306,
  database: 'scriptchain'
});
function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

router.post('/account/create',[check('firstName').notEmpty().isAlpha()
,check('lastName').notEmpty().isAlpha()
,check('companyName').notEmpty(),check('roleInCompany').notEmpty()
,check('email').notEmpty().isEmail()
,check('password').exists().notEmpty()
,check('phone').notEmpty()
,check('ehr').notEmpty()
,body().custom(body => {
  const keys = ['firstName','lastName','companyName','roleInCompany','email','ehr','password','phone'];
  return Object.keys(body).every(key => keys.includes(key));
})], async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  var ip = req.connection.remoteAddress;
  console.log(ip+" "+req.body.email);
    //Check if user alread exists
    const query= 'SELECT * FROM `healthcareproviders` WHERE email=?';
    // req.body.email+'"';
    connection.query(query,[req.body.email], async function(err, row) {
      if(!err) {
          if (row.length>0){
            return res.status(400).send({
                message: 'User already exists'
            })
          }else{
            console.log("email does not exist")
            //Create a jwt token with details provided in body as payload
            const tokeBody = req.body;
            const token = await jwt.sign({tokeBody}, "santosh", { expiresIn: 300 });
            console.log("JWT function")
            //encrypt the token
            var encryptedToken = Utility.EncryptToken(token);
            console.log("Encrpt token")
            //save the token for reference purposes - optional
            var idToken = randtoken.generate(16);
            var json = {
              '_id': generateId(10),
              token: idToken,
              email: req.body.email,
            };
            var query1= "INSERT INTO `tokenSchema` VALUES ("
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
              }else{
                console.log(err);
              }
            });
            console.log("Verification mail with jwt token is sent");
            //Send the email with the verification email
            sendVerificationMail(req.body.email,req.body.firstName,encryptedToken, (err,data) => {
                //Invoked the callback function od the sendverification email object
                if(err){
                    res.status(500).send({message: "An error has occured trying to send the mail"});
                }
                res.status(200).send({message: "Verification mail with jwt token is sent"});
            });
          }
        }else{
          console.log(err);
          res.status(500).send({message: "An error has occured trying to send the mail"});
        }
    });
})

/**
 * Create a new healthcare provider in the db
 * Input: Body, contains the jwt token that was sent for verification
 * Output: 200 - Successfully created a new healthcare provider
 *         400 - Already exists or an error occured
 *         500 - Unexpected errors
 */
router.post('/account/verify',[check("jwtToken").notEmpty(),body().custom(body => {
  const keys = ['jwtToken'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }

    // will recieve an encrypted jwt token
    var encryptedToken = req.body.jwtToken.replace(/ /g, '+');

    //decrypting the token
    const decryptedToken = Utility.DecryptToken(encryptedToken);

    //ToDo: Check for the integrity of the token

    //decoding the token
    var decodedValue = jwtDecode(decryptedToken);

    //Before creating a new provider, check if already exists


    const query = 'SELECT * FROM `healthcareproviders` WHERE email=?';
    // decodedValue.tokeBody.email+'"';
    connection.query(query,[decodedValue.tokeBody.email], async function(err, row) {
      if(!err) {
          if (row.length>0){
            console.log("Check email if exists")
            return res.status(400).send({
                message: 'User already exists'
            })
          }else{
          //Create a new user in the database
          //encrypt the password
          const salt = await bcrypt.genSaltSync(10);
          const hashpassword = await bcrypt.hash(decodedValue.tokeBody.password, salt);
          
          json = decodedValue.tokeBody;
          json['password'] = hashpassword;
          json['_id'] = generateId(10);

          var query1= "INSERT INTO `healthcareproviders` (";
          var val = [];
          for(var myKey in json) {
            query1+=myKey+", ";
            val.push(json[myKey]);
          }
          query1 = query1.slice(0,query1.length-2);
          query1+= ") VALUES (";
          for(var myKey in json) {
            query1+="?,";
          }
          query1 = query1.slice(0,query1.length-1);
          query1 += ")";
          connection.query(query1,val, function(err, row) {
            if(!err) {
                console.log('Inserted successfully');
                res.status(200).send({message: 'The user has been created'});
            }else{
              console.log(err);
              res.status(500).send({message: 'An error has occured trying to create a new healthcareprovider user'})
            }
          });
          }
        }
    });


});

const sendVerificationMail = (email,fname,encryptedToken, callback)=>{

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
        <p align="center"><a href="http://localhost:3000/healthcare/verify?verifytoken=`+encryptedToken + `?API_KEY=` + API_KEY + `"><button>Verify Your E-mail Address</button></a></p><br><br>
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
            callback(err,null);
        }
        transporter.close();
        callback(null,data);
    });
}
module.exports = router;
