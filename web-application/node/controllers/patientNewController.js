/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations
 * Route: /patientnew
 */
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const nodemailer = require('nodemailer');

const mailer_oauth = require('../mailer_oauth');
const sec_utils = require('../security_utils');
const db_utils = require('../db_utils');

const API_KEY = process.env.API_KEY;

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

/**
 * User object ex:
    _id: "12jg201bcm021em"
    fname: "Mike",
    lname: "Witzkowski",
    email: "miketyke699@gmail.com",
    password: "$2a$10$k2kDfbaiqJFLVV9FQrbs5euEC1ybn8xfDe1.ecjUKZK0YTALIP7wq",
    photo: "./images/IMG_006637.png"
    agreementSigned: true;
    verified: false;
 */

/**
 * /patientnew/
 * Adds a new patient user to db
 * Input: patient user object
 * Output: Message indicating whether the account creation was a success or not
 *         200 - Succesfully created patient account
 *         400 - Patient user already exists
 *         401 - Unauthorized client/user
 *         404 - No patients in the database
 */
 router.post('/', [
  check('fname').notEmpty(),
  check('lname').notEmpty(),
  check('email').notEmpty().isEmail(),
  check('password').notEmpty(),
  check('photo').notEmpty(),
  check('agreement-signed').notEmpty(),
  check('user-verified').notEmpty(),
  body().custom(body => {
    const keys = ['fname', 'lname', 'email','password', 'photo', 'agreement-signed', 'user-verified'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req,res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    //Check if user already exists
    const userExists = await db_utils.checkForUserInDB('patientsnew', req.body.email);
    if (userExists) {
      return res.status(400).json({message: 'User already exists'});
    }

    const user = {
      '_id': req.body._id,
      'fname': req.body.fname,
      'lname': req.body.lname,
      'email': req.body.email,
      'phone': "000-000-0000"
      /*
      'password': req.body.password,
      'photo': req.body.photo,
      'agreement-signed': req.body.agreement_signed,
      'user-verified': req.body.user_verified
      */
    };
    // Add new patient to patientsnew table in db
    const resp = await db_utils.insertUserIntoDB('patientsnew', user);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json({message: user})
});


//Creating a new oauthclientt for mailing
const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();

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
