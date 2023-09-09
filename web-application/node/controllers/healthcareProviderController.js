/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations
 */

/* Daniel - fixed database and email sending functionalities */

const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const randtoken = require('rand-token');
const mailer_oauth = require('../utils/mailer_oauth');

const sec_utils = require('../utils/security_utils');
const db_utils = require('../utils/db_utils');
const connection = require('../services/db');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

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
  /*check('photo').notEmpty(),  - photo is not currently getting passed to backend so commented out for now*/
  check('ehr').notEmpty(),
  body().custom(body => {
    const keys = ['firstName', 'lastName', 'companyName', 'roleInCompany', 'email', 'ehr', 'password', 'phone', 'photo'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    /*
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
    */
    const tokeBody = req.body;
    console.log(tokeBody);
    const encryptedToken = await sec_utils.EncryptToken(tokeBody, 86400);// set the expiry time of verification link to 24 hours
    let sql =
    "INSERT INTO tokenSchema (`_id`, `token`, `email`) VALUES (?,?,?)";
    connection().then((con)=> {
      con.query(
        sql,
        [
          generateId(10),
          randtoken.generate(16),
          req.body.email,
        ],
        function (err, results, fields) {
          if (err) throw err;
          else {
            sendVerificationEmail(req.body.email,req.body.firstName,encryptedToken)
            console.log("Query Successful");
            console.log(results);
            res.status(200).send({ message: "Data Recieved and Send to DB" });
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
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
 *         400 - Already exists or jwt token expired or an error occured 
 *         500 - Unexpected errors
 */
router.post('/account/verify', [//Update by Yichen to fix the verification logic chain
  check("jwtToken").notEmpty(),
  body().custom(body => {
    const keys = ['jwtToken'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    //Validate API request 
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    const decryptedRes = await sec_utils.DecryptToken(req.body.jwtToken);
    if (decryptedRes.statusCode != 200) {// TODO: what if jwt expired?
      return res.status(decryptedRes.statusCode).json({message: decryptedRes.message});
    }
    // Check for healthcare provider in db
    console.log(decryptedRes.body.email);
    //const userExists = await db_utils.checkForUserInDB('SignupHealthcareProviders', decryptedRes.body.email);
     const user = decryptedRes.body;
    // Encrypt the password
    const passwordRes = await sec_utils.encryptPassword(user.password);
    let userExists = 0;
    let sql2 = "SELECT * FROM SignupHealthcareProviders WHERE email = ?";
    connection().then((con)=> {
      con.query(
        sql2,
        [
          decryptedRes.body.email
        ],
        function (err, results, fields) {
          if (results.length > 0) {
            userExists = 1;
          }
          if (userExists == 1){
          return res.status(400).json({message: 'User already exists'});
          }
          if (passwordRes.statusCode != 200) {
      return res.status(passwordRes.statusCode).json({message: passwordRes.message});
    }

    delete user['iat'];
    delete user['exp'];
    user['password'] = passwordRes.body;
    user['_id'] = generateId(10);
    console.log(user);
    // Add user user object to healthcareproviders table in db
    let sql =
    "INSERT INTO `SignupHealthcareProviders` (`firstName`, `lastName`, `email`, `companyName`, `ehr`, `roleInCompany`, `password`, `phone`, `_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection().then((con)=> {
      con.query(
        sql,
        [
          user.firstName,
          user.lastName,
          user.email,
          user.companyName,
          user.ehr,
          user.roleInCompany,
          user.password,
          user.phone,
          user._id,
        ],
        function (err, results, fields) {
          if (err) {
            console.log(err);
            return res.status(400).send({message: 'An error occured while creating the user'});
          }
          else {
            return res.status(200).json(user);
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({message: 'An error occured while creating the user'});
    });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({message: 'An error occured while creating the user'});
    });
    


   
    
    
});


//Creating a new oauthclientt for mailing
const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();

const sendVerificationEmail = (email,fname,encryptedToken)=>{
  const handlebarOptions = {
  viewEngine: {
  extName: '.handlebars',
  partialsDir: path.resolve('./views'),
  defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
  extName: '.handlebars',
  }
  

 // Step 1
  let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  type: "login",
  user: 'moh@scriptchain.co', // TODO: your gmail account
  pass: 'vzktjsyuxosnalps' // TODO: your gmail password
  }
  });
    transporter.use('compile', hbs(handlebarOptions));
  // Step 2
  let user = {
  from: '"ScriptChain Health" moh@scriptchain.co', // TODO: email sender
  to: [{name: fname , address: email}],
  // TODO: email receiver
  subject: `Thank You for Registering at ScriptChain Health!`,
  template: 'verification_email',
  context: {
                verifyUrl:
                //Uncomment is need to test in dev env
                  "https://scriptchain.co/healthcare/verify",
                //  "http://dev.scriptchain.co/healthcare/verify",
                token: encodeURIComponent(encryptedToken),
            },
  };
  
  let sender = {
  from: '"ScriptChain Health" moh@scriptchain.co', // TODO: email sender
  to: [{name: "ScriptChain Health", address: "moh@scriptchain.co"}],
  // TODO: email receiver
  subject: `Sign Up Submission`,
  template: 'verification_email'
  };
  
  // Step 3
  transporter.sendMail(user, (err, data) => {
  if (err) {
  console.log(err)
  return res.send('Error occurs').status(500);
  }
  return res.send('User Email Confirmation Sent!!!');
  });
  transporter.sendMail(sender, (err, data) => {
  if (err) {
  console.log(err)
  return res.send('Error occurs').status(500);
  }
  return res.send('Sign Up Email Notification Sent!!!');
  });
}


const sendVerificationMail = (email,fname,encryptedToken, callback)=>{

    //create a transporter with OAuth2
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      type: "login",
      user: 'moh@scriptchain.co', // TODO: your gmail account
      pass: 'vzktjsyuxosnalps' // TODO: your gmail password
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

