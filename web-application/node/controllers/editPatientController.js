const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var { ContactUser } = require("../models/contactUsers");
const log = console.log;
const { Patient } = require("../models/user");
const bcrypt = require('bcryptjs');


/**
 * Method to edit the first name of the patient
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.put("/fname", async (req, res) => {

  const retrievedPatient = await Patient.findOne({ Email: req.body.email })

  if (retrievedPatient) {
    retrievedPatient.fname = req.body.fname;
    const updatedPatient = await Patient.replaceOne({ Email: req.body.email }, retrievedPatient,
      (err, response) => {
        if (err) {
          res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
        }
        res.status(200).json({ "messafe": "Succesfully updatted the patient record in the database" });
      })
  } else {
    res.status(404).json({ "messsage": "Email not found" })
  }

});

/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.put("/lname", async (req, res) => {

  const retrievedPatient = await Patient.findOne({ Email: req.body.email })

  if (retrievedPatient) {
    retrievedPatient.lname = req.body.lname;
    const updatedPatient = await Patient.replaceOne({ Email: req.body.email }, retrievedPatient,
      (err, response) => {
        if (err) {
          res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
        }
        res.status(200).json({ "messafe": "Succesfully updatted the patient record in the database" });
      })
  } else {
    res.status(404).json({ "messsage": "Email not found" })
  }

});

/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.put("/phone", async (req, res) => {

  const retrievedPatient = await Patient.findOne({ Email: req.body.email })

  if (retrievedPatient) {
    retrievedPatient.phone = req.body.phone;
    const updatedPatient = await Patient.replaceOne({ Email: req.body.email }, retrievedPatient,
      (err, response) => {
        if (err) {
          res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
        }
        res.status(200).json({ "messafe": "Succesfully updatted the patient record in the database" });
      })
  } else {
    res.status(404).json({ "messsage": "Email not found" })
  }

});
module.exports = router;

/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.put("/password", async (req, res) => {

  console.log("Trying to edit the password of the user")
  console.log(req.body.email);
  console.log(req.body)
  const retrievedPatient = await Patient.findOne({ Email: req.body.email })

  const validpassword = await bcrypt.compare(req.body.oldPassword, retrievedPatient.password);

  if (!validpassword) return res.status(401).json({

    message: "The old password that has been entered is incorrect"
  });

  if (validpassword) {

    console.log("The entered old password is correct")
    console.log(req.body.newPassword)
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(req.body.newPassword, salt);
    retrievedPatient.password = hashpassword;
    const updatedPatient = await Patient.replaceOne({ Email: req.body.email }, retrievedPatient,
      (err, response) => {
        if (err) {
          res.status(500).json({ "message": "An error has occured trying to update the patient record in the dattabase" });
        }
        res.status(200).json({ "message": "Succesfully updatted the patient record in the database" });
        sendVerificationMail(req.body.email, retrievedPatient.fname);
      })
  } else {
    res.status(404).json({ "messsage": "Email not found" })
  }

});


const oauth2Client = new OAuth2(
  "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
  "ZYdS8bspVNCyBrSnxkMxzF2d",
  "https://developers.google.com/oauthplayground"
);

const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email, fname) => {

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
    subject: 'NO REPLY AT SCRIPTCHAIN.CO! Password successfully changed.',
    html:
      `<!DOCTYPE html>
            <html lang="en">
            <head>
              <title>Bootstrap Example</title>
              <meta charset="utf-8">
            <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto">
            
              <style>
              .panelFooter{
                  font-family: 'Roboto';
                  background-color: #f2f5df;
                  padding-top: 4px;
                  padding-bottom: 4px;
                  border-bottom-left-radius: 15px;
                  border-bottom-right-radius: 15px;
              }
             
                .container1{
                  width: 100%;
                  font-family: 'Roboto';
                  background-color: #00acc1;
                  padding-top: 8px;
                  padding-bottom: 8px;
                  border-top-left-radius: 12px;
                  border-top-right-radius: 12px;
                }
                h2{
                  color: white;
                font-family: 'Roboto', serif;
                }
            h1{
                    
                  font-family: 'Roboto', serif;
            }
                .para{
                  font-family: 'Roboto';
                  margin-left: 16px;
                  margin-right: 16px;
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
                  <h2 align="center">Alert from ScriptChain</h2>
              </div>
              <h1 align="center">Successfully updated your password.</h1>
              <p class="para">Hi ` +
      fname +
      `,</p>
              <p class="para">It seems that you have recently changed your password for your patient account. <br/>Please reach out to customer-care@scriptchain.co immediately if it is not you.</p>
               <br><br>
             <div class="panelFooter">
                <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
              </div>
            </div>
            </body>
            </html>`
  };

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
