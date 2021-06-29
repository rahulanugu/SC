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
const oauth2Client = new OAuth2(
   "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
   "ZYdS8bspVNCyBrSnxkMxzF2d",
   "https://developers.google.com/oauthplayground"
);
const connection = require('../db_connection');
oauth2Client.setCredentials({
   refresh_token:
     "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
 });
const accessToken = oauth2Client.getAccessToken();
var aes256 = require('aes256');
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
// http://localhost:3000/patient/


// ---- Previos dev notes ----
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
 * Retrieve all the patients from the db
 * Input: N/A
 * Output: All the patientts in the database or error
 *         200 - Succesfully retrieved all the patients in the database
 *         404 - No patients in the database
 */
router.get('/', 
  async (req, res) => {
    var decrypted = aes256.decrypt(key, req.query.API_KEY);

    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }
    //ADD THIS
    console.log('you have entered');

    const query = 'SELECT * FROM `patients`';
    connection.query(query, (err, doc) => {
      if (!err) {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).send({message: "No patients found"})
        }
      }
      else {
        res.status(500).json({message: "DB Error"});
        console.log('Error in retrieving patients: ' + JSON.stringify(err, undefined, 2));
      }
    });
});


// get patient using id
/**
 * Get the details of a patient finding by Id
 * Input: Id of the patient to search
 * Output: Details of the patient as specified in the patient schema
 *         200 - patient details are found
 *         404 - An error occured/ No patients found
 */
router.get('/:id', 
  [ check('id').notEmpty() ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({Message:'Bad Request'})
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if(decrypted!=API_KEY){
      return res.status(401).json({Message:'Unauthorized'});
    }

    const query = 'SELECT * FROM `patients` WHERE _id = ?';
    connection.query(query,[req.params.id], (err, doc) => {
      if (!err) {
        if (doc.length==1) {
          res.status(200).json(doc[0]);
        } else {
          res.status(404).send({message: "No patient with the provided id found"});
        }
      } else {
        res.status(500).json({message: "DB Error"});
        console.log('Error in retrieving patients: ' + JSON.stringify(err, undefined, 2));
      }
    });
  }
);

/**
 * Check if the subscriber already exists in the database
 * Input: user object
 * Output: message whether the subscriber exists or not
 */
router.post('/:verify', 
  async (req,res) => {
    console.log("/:verify", res);
    //console.log(req.query);
    if(req.params.verify!="verify"){
      res.status(400).json({message: "Bad Request"});
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if(decrypted!=API_KEY){
      return res.status(401).json({Message:'Unauthorized'});
    }
    const query = 'SELECT * FROM `verifieduser` WHERE email = ?';
    connection.query(query,[req.body.user], (err, checkCurrentSubscriber) => {
      if (!err) {
        if (checkCurrentSubscriber.length>0){
          return res.json('Subscriber already exists')
        }else{
            return res.json('Does not exist')
        }
      }else{
        res.status(500).json({message: "DB Error"});
      }
    });
  }
);

/* -  TO DO -
  POST API with new Configuration interface model
  PATCH API for updating configuration
*/

/**
 * User object ex:
    email: "miketyke699@gmail.com",
    password: "$2a$10$k2kDfbaiqJFLVV9FQrbs5euEC1ybn8xfDe1.ecjUKZK0YTALIP7wq",
    photo: "./images/IMG_006637.png"
    agreementSigned: true;
    verified: false;
 */

/**
 * Create a new user
 * Input: user object
 * Output: message indicating whether the account creation was a success or not
 */
router.post('/', 
  async (req,res) => {
    console.log(req.query);
    var decrypted = aes256.decrypt(key, req.query.API_KEY);

    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    // insert new user object into db
    const query = 'INSERT INTO users SET ?';
    const user = req.body.user;

    connection.query(query, user, (err, res) => {
      if (err) {
        res.status(500).json({message: "DB Error"});
      } 
      else {
        console.log(res);
        if (res.insertID !== null) {
          res.status(200).json({message: 'Subscriber successfully created.'});
        } else {
          res.status(400).json({message: 'Subscriber already exists.'});
        }
      }
    });
  }
);

/**
 * Updates existing user
 * Input: user object
 * Output: message indicating whether the update was a success or not
 */
router.patch('/', 
  async (req,res) => {
    console.log(req.query);
    var decrypted = aes256.decrypt(key, req.query.API_KEY);

    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    // insert new user object into db
    const user = req.body.user;
    const query = genUpdateQuery(user);

    connection.query(query, user, (err, res) => {
      if (err) {
        res.status(500).json({message: "DB Error"});
      } 
      else {
        console.log(res);
        if (res.insertID !== null) {
          res.status(200).json({message: 'Subscriber successfully created.'});
        } else {
          res.status(400).json({message: 'Subscriber already exists.'});
        }
      }
    });
  }
);

// generate query to update user fields
function genUpdateQuery(obj) {
  const id = obj.id;
  const query = `UPDATE 'patients' SET `;
  for (const prop in obj) {
    if (prop == 'id') continue;
    query += `'${prop}'=${obj[prop]} `;
  }
  query += `WHERE 'id'=${id}`;
  return query;
}

/*   NodeMailer   */

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
