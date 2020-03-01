const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const { NewRequestAccessUser } = require("../models/newRequestAccessUser");
const nodemailer = require("nodemailer");

const oauth2Client = new OAuth2(
  "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
  "ZYdS8bspVNCyBrSnxkMxzF2d",
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token:
    "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
});

const accessToken = oauth2Client.getAccessToken();

router.post("/", async (req, res) => {
  const emailExist = await NewRequestAccessUser.findOne({
    email: req.body.email
  });
  if (emailExist) {
    return res.status(400).json({
      message: "Email is already registered"
    });
  }

  var newrequestaccessuser = new NewRequestAccessUser({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    typeOfUser: req.body.typeOfUser
  });
  newrequestaccessuser.save((err, doc) => {
    if (!err) {
      res.status(200).json({
        message: "Your message has been saved"
      });
      mailer(req.body.fname, req.body.email);
    } else {
      console.log("error in saving requested access user");
    }
  });

  const mailer = (fname, email) => {
    //create a transporter with OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
      from: "noreply@scriptchain.co",
      to: email,
      subject: "Hey it's Moh from ScriptChain",
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
              </style>
            </head>
            <body>
            <div class="container">
              <div class="container1">
                  <h2 align="center">Welcome to ScriptChain</h2>
              </div>
              <h1 align="center">We're thrilled to hear from you!</h1>
              <p class="para">Hi ` +
        fname +
        `,</p>
              <p class="para">We have received your submission to request access for ScriptChain platform and someone from the team will keep you updated once we get closer to launch. Thank you!</p>
         <br><br>
             <div class="panelFooter">
                <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
              </div>
            </div>
            </body>
            </html>`
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error occurs");
      }
      transporter.close();
      console.log("Email sent!!!");
    });
  };
});

module.exports = router;
