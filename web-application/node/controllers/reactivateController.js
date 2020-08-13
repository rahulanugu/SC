const express = require("express");
const { check,body, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var jwtDecode = require('jwt-decode');
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
//The controller handles the requests for reactivating user accounts

/**
 * Method to request reactivation of a patient account
 * Input: Body containg email of the user
 *        Body - {email: "example@abc.com"}
 * Output: 200 - successfully executed the request
 *          A mail with jwt token for verification will be sent to the user
 *         404 - user not found
 */
function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}
router.post("/patient/request",[check('email').notEmpty().isEmail(),body().custom(body => {
  const keys = ['email'];
  return Object.keys(body).every(key => keys.includes(key));
})],async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
    try{
    //find the patient

    console.log("Reactivating patient is being requested")
    //const patient = await DeactivatedPatient.findOne({Email : req.body.email});
    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedPatients` WHERE Email=@Email';
    // +'"'+req.body.email+'"';
    const bigQueryOptions = {
      query: query,
      location: 'US',
      params: {Email:req.body.email}
    }
    bigquery.query(bigQueryOptions, function(err, rows) {
      if (!err) {
        if(rows.length==0){
          return res.status(404).json({
          message: "Email not among deactivated users"
          });
        }else{
          const patient = rows[0];
          console.log('test');
          const token = jwt.sign({_id:patient._id,fname:patient.fname,email:patient.Email}, 'santosh', { expiresIn: 500 });

          sendVerificationMail(req.body.email,patient.fname,token);

          return res.status(200).json(
              {
                  "message": "Email Sent"
              }
          );
        }
      }else{
        console.log(err);
      }

    });
  }catch(err){
    console.log(err);
  }
    //generate a jwt token with email,name

    //email the token
});

/**
 * Method to request reactivation of a Healthcareprovider account
 * Input: Body containg email of the user
 *        Body - {email: "example@abc.com"}
 * Output: 200 - successfully executed the request
 *          A mail with jwt token for verification will be sent to the user
 *         404 - user not found
 */
router.post("/healthcare/request",[check('email').notEmpty().isEmail(),body().custom(body => {
  const keys = ['email'];
  return Object.keys(body).every(key => keys.includes(key));
})],async (req, res) => {
  const e = validationResult(req);
  if(!e.isEmpty()){
    return res.status(400).json({Message:'Bad Request'});
  }
  //find the healthcareprovider
  console.log("Reactivating healthcareprovider is being requested")
  //const healthcareProvider = await DeactivatedHealthcareProvider.findOne({email : req.body.email});
  const query = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedHealthcareProviders` WHERE email=@email';
  // +'"'+req.body.email+'"';
  const bigQueryOptions = {
    query: query,
    location: 'US',
    params: {email:req.body.email}
  }
    bigquery.query(bigQueryOptions, function(err, rows) {
      if (!err) {
        if(rows.length==0){
          return res.status(404).json({
          message: "Email not among deactivated users"
          });
        }else{
          const healthcareProvider=rows[0];
          //generate a jwt token with email,name
          const token = jwt.sign({_id:healthcareProvider._id,firstName:healthcareProvider.firstName,email:healthcareProvider.email}, 'santosh', { expiresIn: 500 });

          sendVerificationMailHealthcare(req.body.email,healthcareProvider.firstName,token);

          return res.status(200).json(
              {
                  "message": "Email Sent"
              }
          );
          //email the token
        }
      }else{
        console.log(err);
      }
    });
});


/**
 * Method to move a patient object from DeactivatedPatient database to Patient database
 * Input: Body containg JWT token sent for verification
 *        Body - { token: "jwtToken"}
 * Output: Status of the save operation
 *         200 - Successfylly reactivated the user
 *         500 - An error occured trying to perform the request
 *         404 - Patient not found
 */
router.post("/patient/activate", [check("token").notEmpty(),body().custom(body => {
  const keys = ['token'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }

    //check validity of token
    console.log("print");

   const verification = await jwt.verify(req.body.token, 'santosh', (err, data) => {
      if(err) {
        console.log("Token verification failed")
        return false;
      }
        console.log("Token succesfully verified")
        return true;
        //tokebody of decodedvalue will contain the value of json objet
    })

    if(!verification){
      return res.status(500).json({
        "message": "Jwt token verification failed"
      });
    }

    var decodedValue = jwtDecode(req.body.token);

    console.log(decodedValue)

    //const retrievedPatient = await DeactivatedPatient.findOne({Email: decodedValue.email})
    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedPatients` WHERE Email=@Email';
    // +'"'+decodedValue.email+'"';
    const bigQueryOptions = {
      query: query,
      location: 'US',
      params: {Email:decodedValue.email}
    }
    bigquery.query(bigQueryOptions, function(err, rows) {
      if (!err) {
        if(rows.length>0){
          const patient = rows[0];

          var query4= "INSERT INTO `scriptchainprod.ScriptChain.patients` (";
          for(var myKey in patient) {
            query4+=myKey+", ";

          }
          query4 = query4.slice(0,query4.length-2);
          query4+= ") VALUES (";
          for(var myKey in patient) {
              if(patient[myKey]==false || patient[myKey]==true)
                    query4+="@"+myKey+",";

              else
                query4+="@"+myKey+",";
          }
          query4 = query4.slice(0,query4.length-1);
          query4 += ")";
          console.log(query4);
          const bigQueryOptions4 = {
            query: query4,
            location: 'US',
            params: patient
          }
          bigquery.query(bigQueryOptions4, function(err, row) {
            if(!err) {
                console.log("The deactivated patient entry has been moved to patient");
                const query1 = 'DELETE FROM `scriptchainprod.ScriptChain.deactivatedPatients` WHERE Email=@Email';

                // decodedValue.email+'"';
                const bigQueryOptions1 = {
                  query: query1,
                  location: 'US',
                  params: {Email:decodedValue.email}
                }
                bigquery.query(bigQueryOptions1, function(err, row1) {
                  if(!err){
                    return res.status(200).json({"message":"account has been reactivated"});
                  }else{
                    console.log("An error has occured while trying to delete the patient entry from the patient database")
                    return res.status(500).json({"message": "account could not be deactivated due to an error"});
                  }
                });
            }else{
              console.log("Error occured trying to save deactivated patient in the database"+err);
              return res1.status(500).json({"message": "account could not be deactivated due to an error"});
            }
          });
        }else{
          console.log("Email is not found.")
          return res.status(404).json({"messsage": "A deactivated account could not be found with the email provided"})
        }
      }
    });
});


/**
 * Method to move a healthcare provider object from DeactivatedHealthcareProvider database to HealthcareProvider database
 * Input: Body containg JWT token sent for verification
 *        Body - { toke: "jwtToken"}
 * Output: Status of the save operation
 *         200 - Successfylly reactivated the user
 *         500 - An error occured trying to perform the request
 *         404 - HealthcareProvider not found
 */
router.post("/healthcare/activate", [check("token").notEmpty(),body().custom(body => {
  const keys = ['token'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  //check validity of token

 const verification = await jwt.verify(req.body.token, 'santosh', (err, data) => {
    if(err) {
      console.log("Token verification failed")
      return false;
    }
      console.log("Token succesfully verified")
      return true;
      //tokebody of decodedvalue will contain the value of json objet
  })

  if(!verification){
    return res.status(500).json({
      "message": "Jwt token verification failed"
    });
  }

  var decodedValue = jwtDecode(req.body.token);

  console.log(decodedValue)

  //const retrievedHealthcareProvider = await DeactivatedHealthcareProvider.findOne({email: decodedValue.email})

  const query = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedHealthcareProviders`\
   WHERE email=@email';
  //  +'"'+decodedValue.email+'"';
  const bigQueryOptions = {
    query: query,
    location: 'US',
    params: {email:decodedValue.email}
  }
  bigquery.query(bigQueryOptions, function(err, rows) {
    if (!err) {
      if(rows){
        const retrievedHealthcareProvider = rows[0];

        var query4= "INSERT INTO `scriptchainprod.ScriptChain.healthcareProviders` (";
          for(var myKey in retrievedHealthcareProvider) {
              query4+=myKey+", ";
          }
          query4 = query4.slice(0,query4.length-2);
          query4+= ") VALUES (";
          for(var myKey in retrievedHealthcareProvider) {
              if(retrievedHealthcareProvider[myKey]==false || retrievedHealthcareProvider[myKey]==true)
                  query4+="@"+myKey+",";

              else
                  query4+="@"+myKey+",";

          }
          query4 = query4.slice(0,query4.length-1);
          query4 += ")";
          console.log(query4);
          const bigQueryOptions4 = {
            query: query4,
            location: 'US',
            params: retrievedHealthcareProvider
          }
          bigquery.query(bigQueryOptions4, function(err, row) {
            if(!err) {
                console.log("The deactivated patient entry has been moved to patient");
                const query1 = 'DELETE FROM `scriptchainprod.ScriptChain.deactivatedHealthcareProviders` WHERE email=@email';

                // decodedValue.email+'"';
                const bigQueryOptions1 = {
                  query: query1,
                  location: 'US',
                  params: {email:decodedValue.email}
                }
                bigquery.query(bigQueryOptions1, function(err, row1) {
                  if(!err){
                    return res.status(200).json({"message":"account has been reactivated"});
                  }else{
                    console.log("An error has occured while trying to delete the patient entry from the patient database")
                    return res.status(500).json({"message": "account could not be deactivated due to an error"});
                  }
                });
              }
            });
            }

        }
   else {
      console.log("Email is not found.")
    return res.status(404).json({"messsage": "A deactivated account could not be found with the email provided"})
  }
});
});

const oauth2Client = new OAuth2(
    "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
    "ZYdS8bspVNCyBrSnxkMxzF2d",
    "https://developers.google.com/oauthplayground"
);

const accessToken = oauth2Client.getAccessToken();

const sendVerificationMail = (email,fname,encryptedToken)=>{

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
        subject: 'NO REPLY AT SCRIPTCHAIN.CO! We have recieved a request to reactivate your patient account.',
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
          <h1 align="center"style="font-family: arial;">We have recieved a request to Reactivate your account.</h1>
          <p class="para">Hi `+fname+`,</p>
        <p align="center"><a href="http://scriptchain.co/reactivatepatient?token=`+encryptedToken+`"><button>Click here to reactivate</button></a></p><br><br>
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

const sendVerificationMailHealthcare = (email,fname,encryptedToken)=>{

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
      subject: 'NO REPLY AT SCRIPTCHAIN.COM!!! We have recieved a request to reactivate your healthcare-provider account.',
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
        <h1 align="center"style="font-family: arial;">We have recieved a request to Reactivate your account.</h1>
        <p class="para">Hi `+fname+`,</p>
      <p align="center"><a href="http://scriptchain.co/reactivatehealthcareprovider?token=`+encryptedToken+`"><button>Click here to reactivate</button></a></p><br><br>
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
