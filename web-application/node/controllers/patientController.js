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
const { TokenSchema} = require('../models/tokeSchema');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const randtoken = require('rand-token');

const oauth2Client = new OAuth2(
    "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
    "ZYdS8bspVNCyBrSnxkMxzF2d",
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token:
      "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
  });

const accessToken = oauth2Client.getAccessToken()
// http://localhost:3000/patient/
// get list of all patients
router.get('/', (req, res) => {
    console.log('you have entered');
    Patient.find((err, doc) => {
        if (!err) {
            res.json(doc)
        }
        else {
            console.log('Error in retrieving patients: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// get patient using id
router.get('/:id', (req, res) => {
    // check if id is valid
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    else {
        Patient.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.send(doc);
            }
            else {
                console.log('Error in retrieving patient with id: ' + JSON.stringify(err, undefined, 2));
            }
        })
    }
});

router.post('/:verify',async(req,res)=>{
    console.log('/:verify',req.body.user)
    const userGiven = req.body;
    console.log(userGiven.user)
    const checkCurrentSubscriber = await VerifiedUser.findOne({email: userGiven.user})

    if (checkCurrentSubscriber){
        return res.json('Subscriber already exists')
    }else{
        return res.json('doesnot exist')
    }

})

// this send verification email
router.post('/',async(req,res)=>{

    const tokeBody = req.body;
    // check if email already exist
    const checkCurrentSubscriber = await VerifiedUser.findOne({email: req.body.email})

    if (checkCurrentSubscriber){
        return res.status(400).send('Subscriber already exists')
    }

    const checkEmailExist = await Patient.findOne({Email: req.body.email})

    if (checkEmailExist){
        return res.status(400).send('Email already exists')
    }

    // create JSON Web Token
    // *******make sure to change secret word to something secure and put it in env variable*****
    const token = await jwt.sign({tokeBody}, "santosh", { expiresIn: 180 });

    console.log("Token "+token);
    // using jwt and token
    res.json(token)

    var idToken = randtoken.generate(16);

    const tokenSchema = new TokenSchema({
        token: idToken,
        email: req.body.email
    })

    tokenSchema.save((err,doc)=>{})

    //sendVerificationMail(req.body.email,req.body.fname,idToken);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          (req.body.email,req.body.fname,idToken);

    sendVerificationMail(req.body.email,req.body.fname,token);

})


const sendVerificationMail = (email,fname,token)=>{

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
        <p align="center"><a href="http://scriptchain.co/patientlogin?verify=`+token+`"><button>Verify Your E-mail Address</button></a></p><br><br>
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
