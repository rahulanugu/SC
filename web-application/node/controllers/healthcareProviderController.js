/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations  
 */
const nodemailer = require('nodemailer');
const log = console.log;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;
const hbs = require('nodemailer-express-handlebars');
const jwt = require('jsonwebtoken');
const { Patient } = require('../models/user');
const { VerifiedUser } = require('../models/verifiedUser');
const { HealthcareProvider} = require('../models/healthcareProvider');
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
const accessToken = oauth2Client.getAccessToken()

/**
 * Request the creation of a new healthcareprovider user
 * Input: Body, contains the details that are specified in healthcare provider data model
 * Output: 200 - Success status, and the email is sent
 *         500 - Error status
 *         400 - Already exists
 */
router.post('/account/create',async(req,res)=>{
    
    //Check if user alread exists
    const checkIfExists = await HealthcareProvider.findOne({email: req.body.email});
    if(checkIfExists){
        console.log("Check email if exists")
        return res.status(400).send({
            message: 'User already exists'
        })
    }
    console.log("email does not exist")

    //Create a jwt token with details provided in body as payload
    const tokeBody = req.body;
    const token = await jwt.sign({tokeBody}, "santosh", { expiresIn: 300 });

    //encrypt the token
    var encryptedToken = Utility.EncryptToken(token);

    //save the token for reference purposes - optional
    var idToken = randtoken.generate(16);
    const tokenSchema = new TokenSchema({
        token: idToken,
        email: req.body.email
    })
    tokenSchema.save((err,doc)=>{
        if(err){
            console.log("Reference token could not be saved")
        }
    })

    //Send the email with the verification email

    sendVerificationMail(req.body.email,req.body.firstName,encryptedToken, (err,data) => {
        //Invoked the callback function od the sendverification email object
        if(err){
            res.status(500),send({message: "An error has occured trying to send the mail"});
        }
        res.status(200).send({message: "Verification mail with jwt token is sent"});
    });
})

/**
 * Create a new healthcare provider in the db
 * Input: Body, contains the jwt token that was sent for verification
 * Output: 200 - Successfully created a new healthcare provider
 *         400 - Already exists or an error occured
 *         500 - Unexpected errors
 */
router.post('/account/verify',async(req,res)=>{
    
    // will recieve an encrypted jwt token
    var encryptedToken = req.body.jwtToken.replace(/ /g, '+');

    //decrypting the token
    const decryptedToken = Utility.DecryptToken(encryptedToken);

    //ToDo: Check for the integrity of the token

    //decoding the token
    var decodedValue = jwtDecode(decryptedToken);

    //Before creating a new provider, check if already exists
    const checkIfExists = await HealthcareProvider.findOne({email: decodedValue.tokeBody.email});

    if(checkIfExists){
        return res.status(400).send({
            message: 'User already exists'
        })
    }

    //Create a new user in the database
    //encrypt the password
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(decodedValue.tokeBody.password, salt);

    //create a new healthcare provider object with the attributes from the decoded request body
    const healthcareProvider = new HealthcareProvider({
        firstName: decodedValue.tokeBody.firstName,
        lastName: decodedValue.tokeBody.lastName,
        companyName: decodedValue.tokeBody.companyName,
        location: decodedValue.tokeBody.location,
        roleInCompany: decodedValue.tokeBody.roleInCompany,
        email: decodedValue.tokeBody.email,
        password: hashpassword,
        phone: decodedValue.tokeBody.phone
    })

    healthcareProvider.save((err,doc) => {
        if (!err) {
            // returns saved patient and 24hex char unique id
            
            res.status(200).send({message: 'The user has been created'});
        }
        else {
            console.log('Error in saving patient: ' + JSON.stringify(err, undefined, 2));
            res.status(500).send({message: 'An error has occured trying to create a new helathcareprovider user'})
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
        subject: 'NO REPLY AT SCRIPTCHAIN.COM!!! Hey it\'s Moh from ScriptChain',
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
        <p align="center"><a href="http://scriptchain.co/healthcare/verify?verifytoken=`+encryptedToken+`"><button>Verify Your E-mail Address</button></a></p><br><br>
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