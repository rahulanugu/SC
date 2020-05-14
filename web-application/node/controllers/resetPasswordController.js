const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var { Patient } = require('../models/user');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var jwtDecode = require('jwt-decode');
var Utility = require('../utility');




var router = express.Router();
//The controller is used for generating a JWT token to initiate a password reset request

/**
 * Generate a JWT token for user/patient object and save it in db
 * Also, email user with password reset page link with jwt token
 * Input: User/Patient email
 * Output: 401 - Email not found (or) 200 - Email has been sent
 */
router.post('/', async (req, res) => {

  if (!req.body.email || (req.body.email === " ")) return req.status(401).json({
    message: "Email is not provided"

  });
  //try finding the email in the database
  const patient = await Patient.findOne({ Email: req.body.email });

  //if patient email is is not found in the database, then return an error
  if (!patient) return res.status(401).json({

    message: "Invalid Email"
  });

  //create a new JWT token and send it to the email of the user



  // //check for password
  // const validpassword = await bcrypt.compare(req.body.password, patient.password);

  // if(!validpassword) return res.status(401).json({

  //   message:"Invalid username or password"
  // });


  // create JSON Web Token
  // *******make sure to change secret word to something secure and put it in env variable*****
  const token = await jwt.sign({ patient }, "santosh", { expiresIn: 120 });

  //save the token
  //   const resetPasswordToken = new ResetPasswordToken ({
  //     token: token
  //   });

  //   resetPasswordToken.save((err, doc) => {
  //     if (err) {
  //       console.log('Error in saving reset password token: ' + JSON.stringify(err, undefined, 2));
  //     }
  // });

  //encrypt the token

  const encryptedToken = Utility.EncryptToken(token);
  //mail the token
  sendVerificationMail(req.body.email, patient.fname, encryptedToken);

  res.status(200).json({
    message: "Email has been sent to reset password"
  });
});

/**
 * Verify the jwt token and return the if valid or not
 */
router.post('/check', async (req, res) => {

  // The token we get here is encrypted, so we need to decode it
  // will recieve an encrypted jwt token
  console.log("checking the validity of tthe password in check")
  var encryptedToken = req.body.token.replace(/ /g, '+');
  console.log(encryptedToken)

  jwt.verify(Utility.DecryptToken(encryptedToken), 'santosh', (err, verifiedJwt) => {
    if (err) {
      res.status(500).send(err.message)
    } else {
      res.status(200).json({
        message: "jwt is verified"
      })
    }
  })


});

router.post('/change_password', async (req, res) => {
  console.log("Reached change password")
  const str = req.body;

  // The token we get here is encrypted, so we need to decode it
  // will recieve an encrypted jwt token
  var correctedToken = req.body.token.replace(/ /g, '+');
  const decryptedToken = Utility.DecryptToken(correctedToken);

  console.log("corrected token \n" + correctedToken)
  //verify jwt token
  jwt.verify(decryptedToken, 'santosh', (err, verifiedJwt) => {
    if (err) {
      console.log("Couldn't verify the token")
      console.log(err)
      res.status(500).send(err.message)
    } else {
      //jwt is verified, decode it for email

      //jwt is encrypted when reached here, need to decrypt it before using
      //decode jwtt payload it for email
      var decodedValue = jwtDecode(decryptedToken);

      console.log("Decrypted ttoken being modified");
      console.log(decodedValue);
      //.tokebody of decodedvalue will contain the value of json object
      //find the email and update the object
      Patient.findOne({ Email: decodedValue.patient.Email }, async function (err, doc) {
        if (doc != null) {
          const salt = bcrypt.genSaltSync(10);
          const hashpassword = await bcrypt.hash(req.body.password, salt);
          console.log(hashpassword)
          Patient.update({ _id: doc._id }, { $set: { password: hashpassword } }, function (err, response) {
            if (!response) {
              res.status(500).send({ message: "Could not update the record" });
            } else {
              console.log("Here")
              console.log(response);
              res.status(200).send({ message: "Record has been updated" });
            }
          });
        } else {
          res.status(404).send({ message: "email not found" })
        }
      });
    }
  })
});

const oauth2Client = new OAuth2(
  "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
  "ZYdS8bspVNCyBrSnxkMxzF2d",
  "https://developers.google.com/oauthplayground"
);

const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email, fname, encryptedToken) => {

  //create a transporter with OAuth2
  const transporter = nodemailer.createTransport({
    service: 'gmail',
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
    subject: 'NO REPLY AT SCRIPTCHAIN.CO! We have recieved a request to reset password.',
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
          }
          .container{
          }
            .container1{
              width: 100%;
              font-family: arial;
              background-color: #6638e2;
              padding-top: 8px;
              padding-bottom: 8px;
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
              width: 150px;
              height: 40px;
              border-radius: 10px;
              color: white;
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
            	background-color: grey;
              }
              .container{
                max-width: 600px;
            	background-color: white;
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
          <h1 align="center"style="font-family: arial;">Please follow the link to reset your password</h1>
          <p class="para">Hi `+ fname + `,</p>
        <p align="center"><a href="http://scriptchain.co/patient/password/resetpage?token=`+ encryptedToken + `?email=` + email + `"><button>Reset Password</button></a></p><br><br>
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