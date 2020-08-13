const express = require('express');
const { check,body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var jwtDecode = require('jwt-decode');
var Utility = require('../utility');
var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);

//The controller is used for generating a JWT token to initiate a password reset request

/**
 * Generate a JWT token for user/patient object and save it in db
 * Also, email user with password reset page link with jwt token
 * Input: User/Patient email
 * Output: 401 - Email not found (or) 200 - Email has been sent
 */
router.post('/', [check('email').notEmpty().isEmail(),body().custom(body => {
  const keys = ['email'];
  return Object.keys(body).every(key => keys.includes(key));
})],async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }

  if (!req.body.email || (req.body.email === " ")) return req.status(401).json({
    message: "Email is not provided"

  });
  //try finding the email in the database

  const query = 'SELECT * FROM `scriptchainprod.ScriptChain.patients` WHERE Email=@email';
  // '+'"'+req.body.email+'"';
  const bigQueryOptions = {
    query: query,
    location: 'US',
    params: {email:req.body.email}
  }
    bigquery.query(bigQueryOptions, async function(err, patient) {
      if (!err) {
        if (patient.length==0){
           return res.status(401).json({
            message: "Invalid Email"
          });
        }else{
          const token = await jwt.sign({ patient }, "santosh", { expiresIn: 120 });
          const encryptedToken = Utility.EncryptToken(token);
          //mail the token
          sendVerificationMail(req.body.email, patient[0].fname, encryptedToken);

          res.status(200).json({
            message: "Email has been sent to reset password"
          });
        }

      }
    });
});

/*
,
*/
/**
 * Verify the jwt token and return the if valid or not
 */
router.post('/check',[check("token").notEmpty(),body().custom(body => {
  const keys = ['token'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req,res)=>{
  console.log(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }

  // The token we get here is encrypted, so we need to decode it
  // will recieve an encrypted jwt token
  console.log("checking the validity of tthe password in check")
  var encryptedToken = req.body.token.replace(/ /g, '+');
  //console.log(encryptedToken)

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
/*
*/
router.post('/change_password',[check("token").notEmpty(),check("password").notEmpty(),body().custom(body => {
  const keys = ['token','password'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req,res)=>{
  //console.log(req);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  console.log("Reached change password")
  const str = req.body;

  // The token we get here is encrypted, so we need to decode it
  // will recieve an encrypted jwt token
  var correctedToken = req.body.token.replace(/ /g, '+');
  const decryptedToken = Utility.DecryptToken(correctedToken);

  //console.log("corrected token \n" + correctedToken)
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
      const query1 = 'SELECT * FROM `scriptchainprod.ScriptChain.patients` WHERE Email=@Email';
      // +'"'+req.body.email+'"';
      const bigQueryOptions1 = {
        query: query1,
        location: 'US',
        params: {Email:decodedValue.patient[0].Email}
      }
      bigquery.query(bigQueryOptions1, async function(err, doc) {
        if (!err) {
          if (doc.length>0){
            console.log('Selected');
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = await bcrypt.hash(req.body.password, salt);
            const patient = doc[0];
            patient['password'] = hashpassword;
            console.log(hashpassword);
            const query2 = 'DELETE FROM `scriptchainprod.ScriptChain.patients` WHERE _id=@id';
            // +'"'+req.body.email+'"';
            console.log(patient);
            const bigQueryOptions2 = {
              query: query2,
              location: 'US',
              params: {id:patient['_id']}
            }
            bigquery.query(bigQueryOptions2, function(err, row1) {
              if(!err){
                console.log('Deleted');

                var query3= "INSERT INTO `scriptchainprod.ScriptChain.patients` (";
                for(var myKey in patient) {
                  query3+=myKey+", ";
                }
                query3 = query3.slice(0,query3.length-2);
                query3+= ") VALUES (";
                for(var myKey in patient) {
                  if(patient[myKey]==false || patient[myKey]==true)
                      query3+="@"+myKey+",";

                  else
                    query3+="@"+myKey+",";

                }
                query3 = query3.slice(0,query3.length-1);
                query3 += ")";
                console.log(query3)
                const bigQueryOptions3 = {
                  query: query3,
                  location: 'US',
                  params: patient
                }
                bigquery.query(bigQueryOptions3, function(err, row) {
                  if(!err) {
                      console.log('Inserted successfully');
                      res.status(200).send({message:"Record has been updated"});
                  }else{
                    console.log(err);
                    res.status(500).send({message:"Could not update the record"});
                  }
                });
              }
              else{
                console.log(err);
              }
            });
          }
          else {
            res.status(404).send({ message: "email not found" })
          }
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

  console.log(fname);
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
