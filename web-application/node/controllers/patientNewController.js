/**
 * patientNewController.js
 * Use for patient sign up page
 * Defines endpoints that allows application to perform CRUD operations
 * Route: /patients/signup
 */
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const nodemailer = require('nodemailer');
const connection = require('../services/db');

const mailer_oauth = require('../utils/mailer_oauth');
const sec_utils = require('../utils/security_utils');
const db_utils = require('../utils/db_utils');

//const API_KEY = '';
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

router.post('/create', async (req, res) => {
console.log("Avatar Image >>",req.body.imageUrl);
  let tokenBody = {
    email : req.body.emailPhone
  }
  let password = await sec_utils.encryptPassword(req.body.password)
  // BharatChadalawada: Set the expiry time of verification link to 24 hours
    const encryptedToken = await sec_utils.EncryptToken(tokenBody, 86400);
  let sql = "INSERT INTO patientsnew (`emailPhone`, `password`,`profile_img`,`is_agree`) VALUES (?,?,?,?)";
  connection().then(async (con) => {
  //BharatChadalawada:Added variables and queries to insert data into patientsnew table
    con.query(
      sql,
      [
        req.body.emailPhone,
        password.body,
        req.body.imageUrl,
        req.body.is_agree
      ],
      function (err, results) {
        if (err){
          //BharatChadalawada : verifiying if patient email already exists
          if(err.code == 'ER_DUP_ENTRY'){
            res.status(400).send({message:"Patient Email or Phone already exists"})
          }else{
            res.status(500).send({err});
          }
          console.log(err);
        }
        else {
          //BharatChadalawada : Sending verification mail to patient
          sendVerificationMail(req.body.emailPhone,encryptedToken);
          // console.log(results);
          res.status(200).send({ message: "Patient registered successfully" }); 
        }
      }
    );
  }).catch((err) => {
      // console.log(err);
  });
});

//BharatChadalawada:Added API to update patient profile image / avatar
router.post('/profile-picture', (req, res) => { 
  const { emailPhone, imageUrl } = req.body;

  const sql = 'UPDATE patientsnew SET photo = ? WHERE emailPhone = ?';
  connection()
    .then((con) => {
      con.query(sql, [imageUrl, emailPhone], function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).send({ error: 'An error occurred while updating the profile picture' });
        }
        if (results.affectedRows === 0) {
          console.log('No rows updated');
          return res.status(404).send({ error: 'No matching records found for the provided emailPhone' });
        }
        console.log('Profile picture updated successfully');
        return res.status(200).send({ message: 'Profile picture uploaded successfully' });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ error: 'An error occurred while connecting to the database' });
    });
});



//  router.post('/', [
//   check('fname').notEmpty(),
//   check('lname').notEmpty(),
//   check('email').notEmpty(),
//   check('password').notEmpty(),
//   check('photo').notEmpty(),
//   check('agreement-signed').notEmpty(),
//   check('user-verified').notEmpty(),
//   body().custom(body => {
//     const keys = ['fname', 'lname', 'email','password', 'photo', 'agreement-signed', 'user-verified'];
//     return Object.keys(body).every(key => keys.includes(key));
//   })],
//   async (req,res) => {
//     // Validate API request
//     const validate = sec_utils.APIRequestIsValid(req);
//     if (validate.statusCode != 200) {
//       return res.status(validate.statusCode).json({message: validate.message});
//     }
//     //Check if user already exists
//     const userExists = await db_utils.checkForUserInDB('patientsnew', req.body.email);
//     if (userExists) {
//       return res.status(400).json({message: 'User already exists'});
//     }

//     const user = {
//       '_id': req.body._id,
//       'fname': req.body.fname,
//       'lname': req.body.lname,
//       'email': req.body.email,
//       'phone': "000-000-0000"
//       /*
//       'password': req.body.password,
//       'photo': req.body.photo,
//       'agreement-signed': req.body.agreement_signed,
//       'user-verified': req.body.user_verified
//       */
//     };
//     // Add new patient to patientsnew table in db
//     const resp = await db_utils.insertUserIntoDB('patientsnew', user);
//     if (resp.statusCode != 200) {
//       return res.status(resp.statusCode).json({message: resp.message});
//     }
//     return res.status(200).json({message: user})
// });


//Creating a new oauthclientt for mailing
const oauth2Client = mailer_oauth.getClient();
const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email,encryptedToken)=>{

  //BharatChadalawada:Added username and passwrod to send mail   
  const fname = email;
  const transporter = nodemailer.createTransport({
      service : 'gmail',
      auth: {
        type: "login",
        user: 'moh@scriptchain.co', // TODO: your gmail account
        pass: 'vzktjsyuxosnalps' // TODO: your gmail password
        }
  });

  // BharatChadalawada:Added 2 variables to template for token and customer name
  //create mail option with custom template, verification link and Json Web Token
  const mailOptions = {
      from: 'noreply@scriptchain.co',
      to: email,
      subject: 'Registration at SCRIPTCHAIN.CO',
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
        <p align="center"><a href="http://localhost:4200/patient/login?verify=`+encryptedToken+ `&API_KEY=` + API_KEY + `"><button>Verify Your E-mail Address</button></a></p><br><br>
      <p align="center" class="para">If you have any questions or concerns feel free to reach out to <a href="mailto:customer-care@scriptchain.co">customer-care@scriptchain.co</a></p>
        <div class="panelFooter">
          <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
        </div>
      </div>
      </body>
      </html>
      `
  }

  // BharatChadalawada:Added transporter to send mail
  transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
          // res.json({err});
          console.log(err);
      }
      transporter.close();
      console.log('Email Sent Successfully');
      return true;
  });
}

//BharatChadalawada
//Verify Paitent and update table :patientsnew Via Email Verify Link 
//Added an API call to update user if he is verified thru mail 
//TC column added to model 

router.patch('/verify-patient',  async (req,res) => {
    // Validate API request
    console.log("Verify Patient Api Call >>>",req.body)
    let tokenObj = await sec_utils.DecryptToken(req.body.token);
    // const validate = sec_utils.APIRequestIsValid(req);
    if (tokenObj.statusCode != 200) {
      return res.status(validate.statusCode).json({message: tokenObj.message});
    }
    const userData = tokenObj.body
    let sql = "UPDATE patientsnew set is_email_verified = 1 where `emailPhone` = ?;"; // BharatChadalawada : Flag user as verified
  connection().then((con) => {
    con.query(
      sql,
      [
        userData.email
      ],
      function (err, results) {
        if (err){
          res.status(500).send({err});
          console.log(err);
        }
        else {
          // console.log(results);
          // BharatChadalwada : flag message to be sent to front end
          res.status(200).send({ message: "Patient Verified successfully" }); 
        }
      }
    );
  }).catch((err) => {
      console.log(err);
  });
    return res;
});

module.exports = router;
