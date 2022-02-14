/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations
 */
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const randtoken = require('rand-token');
const mailer_oauth = require('../utils/mailer_oauth');

const sec_utils = require('../utils/security_utils');
const db_utils = require('../utils/db_utils');

const API_KEY = '';
// const API_KEY = process.env.API_KEY;


function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}
/**
 * Request the creation of a new healthcareprovider user
 * Input: Body, contains the details that are specified in healthcare provider data model
 * Output: 200 - Success status, and the email is sent
 *         500 - Error status
 *         400 - Already exists
 */
router.post('/account/create',[
  check('firstName').notEmpty().isAlpha(),
  check('lastName').notEmpty().isAlpha(),
  check('companyName').notEmpty(),
  check('roleInCompany').notEmpty(),
  check('email').notEmpty().isEmail(),
  check('password').notEmpty(),
  check('phone').notEmpty(),
  check('photo').notEmpty(),
  check('ehr').notEmpty(),
  body().custom(body => {
    const keys = ['firstName', 'lastName', 'companyName', 'roleInCompany', 'email', 'ehr', 'password', 'phone', 'photo'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    var ip = req.connection.remoteAddress;
    console.log(ip, req.body.email);
    //Check if user already exists
    const userExists = await db_utils.checkForUserInDB('healthcareproviders', req.body.email);
    if (userExists) {
      return res.status(400).json({message: 'User already exists'});
    }
    console.log("Email does not exist")
    // User does not exist
    // Create JWT using details provided in body as payload
    const tokeBody = req.body;
    const encryptedToken = await sec_utils.EncryptToken(tokeBody);
    const data = {
      '_id': generateId(10),
      'token': randtoken.generate(16),
      'email': req.body.email,
    };
    // Save the token for reference purposes - optional
    const resp = await db_utils.insertUserIntoDB('tokenSchema', data);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(data);
    /*
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    // Send the email with the verification email
    sendVerificationMail(req.body.email, req.body.firstName, encryptedToken, (err,data) => {
      // Invoked the callback function of the sendverification email object
      if (err) {
        return res.status(500).send({message: "An error has occured trying to send the mail"});
      }
      console.log("Verification mail with jwt token is sent");
      return res.status(200).send({message: "Verification mail with jwt token is sent"});
    });
    */
});

/**
 * Create a new healthcare provider in the db
 * Input: Body, contains the jwt token that was sent for verification
 * Output: 200 - Successfully created a new healthcare provider
 *         400 - Already exists or an error occured
 *         500 - Unexpected errors
 */
router.post('/account/verify', [
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
    // Check for healthcare provider in db
    const userExists = await db_utils.checkForUserInDB('healthcareproviders', req.body.email);
    if (userExists) {
      return res.status(400).send({message: 'User already exists'});
    }
    const user = decryptedRes.body;
    console.log(user);
    // Encrypt the password
    const passwordRes = await sec_utils.encryptPassword(user.password);
    if (passwordRes.statusCode != 200) {
      return res.status(passwordRes.statusCode).json({message: passwordRes.message});
    }

    delete user['iat'];
    delete user['exp'];
    user['password'] = passwordRes.body;
    user['_id'] = generateId(10);

    // Add user user object to healthcareproviders table in db
    const resp = await db_utils.insertUserIntoDB('healthcareproviders', user);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(user);
});


//Creating a new oauthclientt for mailing
const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();

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

