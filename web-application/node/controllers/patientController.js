/**
* patientController.js
* Uses express to create a RESTful API
* Defines endpoints that allows application to perform CRUD operations
* Route: /patient
*/
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const nodemailer = require('nodemailer');

const mailer_oauth = require('../utils/mailer_oauth');
const sec_utils = require('../utils/security_utils');
const db_utils = require('../utils/db_utils');

const API_KEY = '';
// const API_KEY = process.env.API_KEY;
// http://localhost:3000/patient/


// --- Previous dev notes ---
// Authentication to enter this?
// How to secure this?
// Need some sort of hack check. How do we check it?
// Possible type of hacks for an API.
//validation for id is a side task
//express validation is a side task
//usage of headers, how UI handles it?
//helmet npm package usage?

// get list of all patients
/**
 * /patient/
 * Retrieve all the patients from the db
 * Input: N/A
 * Output: All the patientts in the database or error
 *         200 - Succesfully retrieved all the patients in the database
 *         404 - No patients in the database
 */
router.get('/', [
  body().custom(body => {
    return Object.keys(body).length === 0;
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log('you have entered');
    
    // Get all patients from db
    const resp = await db_utils.getAllRowsFromTable('patients');
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(resp.statusCode).json(resp.body);
});


// get patient using id
/**
 * /patient/:id
 * Get the details of a patient finding by Id
 * Input: Id of the patient to search
 * Output: Details of the patient as specified in the patient schema
 *         200 - patient details are found
 *         404 - An error occured/ No patients found
 */
router.get('/:id', [
  check('_id').notEmpty(),
  body().custom(body => Object.keys(body).length == 0)
  ], 
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    // Get patient from db
    const resp = await db_utils.getRowByID('patients', req.params._id);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(resp.statusCode).json(resp.body);
});

/**
 * /patient/verify
 * Check if the subscriber already exists in the database
 * Input: user object
 * Output: message whether the subscriber exists or not
 */
router.post('/verify', [
  body().custom(body => {
    const keys = ['email']
    return Object.keys(body).every(key => keys.includes(key))
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    // Check for user in verifiedUser table in db
    const userExists = await db_utils.checkForUserInDB('verifiedUser', req.body.email);
    if (userExists) {
      return res.status(403).json({message:'Subscriber already exists'});
    }
    return res.status(200).json({message:'Does not exist'});
});

/**
 * User object ex:
    fname: "Mike",
    lname: "Witzkowski",
    email: "miketyke699@gmail.com",
    password: "$2a$10$k2kDfbaiqJFLVV9FQrbs5euEC1ybn8xfDe1.ecjUKZK0YTALIP7wq",
    photo: "./images/IMG_006637.png"
    agreementSigned: true;
    verified: false;
 */

/**
 * Updates existing user
 * Input: user object
 * Output: message indicating whether the update was a success or not
 */
router.patch('/', [
  body().custom(body => {
    const keys = ['_id'];
    return Object.keys(body).every(key => keys.includes(key));
  })
  ],
  async (req,res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const userChanges = req.body
    // Update patient info in db
    const resp = await db_utils.updateUserInDB('patients', userChanges);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(resp.statusCode).json(userChanges);
});

/*   NodeMailer   */

const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email,fname,encryptedToken) => {

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
