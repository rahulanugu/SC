const express = require('express');
var router = express.Router();
const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const mailer_oauth = require('../utils/mailer_oauth');

const sec_utils = require('../utils/security_utils');
const db_utils = require('../utils/db_utils');

const API_KEY = '';

//The controller is used for generating a JWT token to initiate a password reset request for healthcareProvider portal
/**
 * Generate a JWT token for user/patient object and save it in db
 * Also, email user with password reset page link with jwt token
 * Input: User/Patient email
 * Output: 401 - Email not found (or) 200 - Email has been sent
 */

router.post('/', [
  check('email').notEmpty().isEmail(),
  body().custom(body => {
    const keys = ["email"];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async(req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("request is recieved and being processed");
    
    // Get healthcare provider from db
    const resp = await db_utils.getRowByEmail('healthcareproviders', req.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    const healthcareProvider = resp.body;
    const encryptedToken = await sec_utils.EncryptToken({healthcareProvider}, 120);

    //mail the token
    // sendVerificationMail(req.body.email, healthcareProvider.firstName, encryptedToken);

    //create a new JWT token and send it to the email of the user
    
    // //check for password
    // const validpassword = await bcrypt.compare(req.body.password, patient.password);
    
    // if(!validpassword) return res.status(401).json({
      
    //   message:"Invalid username or password"
    // });
      
    return res.status(200).json({message: "Email has been sent to reset password"});
});

/**
 * Verify the jwt token and return the if valid or not
 */
router.post('/check', [
  check("token").notEmpty(),
  body().custom(body => { 
    const keys = ['token'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async(req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const decryptedRes = await sec_utils.DecryptToken(req.body.token);
    if (decryptedRes.statusCode != 200) {
      return res.status(decryptedRes.statusCode).json({message: decryptedRes.message});
    }
    return res.status(200).json({message: "JWT is verified"});
});

/**
 * Change user password in db, verifying JWT first
 * Input: JWT, new password
 * Output: 200 - Password successfully updated
 *         400 - Bad request
 *         401 - Authorization failed
 *         500 - DB error
 */
router.patch('/change_password',[
  check("token").notEmpty(),
  check("password").notEmpty(),
  body().custom(body => {
    const keys = ['token','password'];
    return Object.keys(body).every(key => keys.includes(key));
  })], 
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const decryptedRes = await sec_utils.DecryptToken(req.body.token);
    if (decryptedRes.statusCode != 200) {
      return res.status(decryptedRes.statusCode).json({message: decryptedRes.message});
    }
    console.log("Reached change password for healthcare provider")

    // JWT is verified
    // decryptedToken will contain the provider json object
    
    // Get healthcare provider from db
    const resp = await db_utils.getRowByEmail('healthcareproviders', decryptedRes.body.email);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    const provider = resp.body;
    const hashpassword = await sec_utils.encryptPassword(password);
    console.log(hashpassword);
    // Update provider info in db
    const respo = await db_utils.updateUserInfoInDB('healthcareproviders', provider);
    if (respo.statusCode != 200) {
      return res.status(respo.statusCode).json({message: respo.message});
    }
    return res.status(200).json(provider);
});

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
          <h1 align="center"style="font-family: arial;">Please follow the link to reset your password</h1>
          <p class="para">Hi `+fname+`,</p>
        <p align="center"><a href="http://scriptchain.co/healthcare/password/resetpage?token=`+encryptedToken+`?email=`+email+ `?API_KEY=` + API_KEY + `"><button>Click to reset the password</button></a></p><br><br>
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
