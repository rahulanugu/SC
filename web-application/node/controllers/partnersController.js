/* Daniel - fixed database and email sending functionalities */

const express = require("express");
const router = express.Router();
const { check, body } = require('express-validator');
const nodemailer = require("nodemailer");

const mailer_oauth = require('../utils/mailer_oauth');
const db_utils = require('../utils/db_utils');
const sec_utils = require('../utils/security_utils');

const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const connection = require('../services/db');

//const {BigQuery} = require('@google-cloud/bigquery');
//const bigquery = new BigQuery();

/**
 * Method to save a new rew request access user
 * Input: Body, Contains the details specified in te NewRequesttAccessUser schema
 * Output: The status of the save operation
 *         200 - Succesfully saved the request
 *         500 - Couldnot complete the request of saving the new request access user
 */
function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

router.post("/email", (req, res) => {
  let sql =
    "INSERT INTO partners (`_id`, `fname`, `lname`, `email`, `phone`, `jobtitle`, `companyname`, `companyvertical`, `companyaddress`, `city`, `state`, `postalcode`, `country`, `message`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection().then((con)=> {
      con.query(
        sql,
        [
          generateId(10),
          req.body.fname,
          req.body.lname,
          req.body.email,
          req.body.phone,
          req.body.jobtitle,
          req.body.companyname,
          req.body.companyvertical,
          req.body.companyaddress,
          req.body.city,
          req.body.state,
          req.body.postalcode,
          req.body.country,
          req.body.message,
        ],
        function (err, results, fields) {
          if (err) throw err;
          else {
            console.log("Query Successful");
            console.log(results);
            sendVerificationEmail(req.body.email, req.body.fname);
            res.status(200).send({ message: "Data Recieved and Send to DB" });
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
  
    
});

const sendVerificationEmail = (email,fname)=>{
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
  subject: `Thank You for Requesting a Partnership with ScriptChain Health!`,
  template: 'becomeAPartnerEmail'
  };
  
  let sender = {
  from: '"ScriptChain Health" moh@scriptchain.co', // TODO: email sender
  to: [{name: "ScriptChain Health", address: "moh@scriptchain.co"}],
  // TODO: email receiver
  subject: `Partnership Request Submission`,
  template: 'becomeAPartnerEmail'
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

router.post("/", [
  check('fname').notEmpty().isAlpha(),
  check('lname').notEmpty().isAlpha(),
  check('email').notEmpty().isEmail(),
  check('phone').notEmpty(),
  check('jobtitle').notEmpty(),
  check('companyname').notEmpty(),
  check('companyvertical').notEmpty(),
  check('companyaddress').notEmpty(),
  check('city').notEmpty(),
  check('state').notEmpty(),
  check('postalcode').notEmpty(),
  check('country').notEmpty(),
  check('message').notEmpty(),
  body().custom(body => {
    const keys = ['fname', 'lname', 'email', 'phone', 'jobtitle', 'companyname', 'companyvertical',
                  'companyaddress', 'city', 'state', 'postalcode', 'country', 'message'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    // Check for partner in db   
    const partner = req.body;
    const userExists = await db_utils.checkForUserInDB('partners', partner.email);
    if (userExists) {
      return res.status(200).json({message: "Email is already registered"});
    }
    // Partner not found, add partner to db
    partner['_id'] = generateId(10);
    const resp = await db_utils.insertUserIntoDB('partners', partner);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    // Send emails
    //mailer(partner.fname, partner.email);
    //mailer1(partner.fname, partner.email);
    return res.status(200).json(partner);
});
  

  const oauth2Client = mailer_oauth.getClient();
  const accessToken = oauth2Client.getAccessToken();

  /**
 * Mailer for sending the emails
 * @param {First name of reciever} fname
 * @param {Destination of Email} email
 */
  const mailer = (fname, email) => {
    //create a transporter with OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "moh@scriptchain.co",
        clientId: "903951478096-uctvse753g68mcaqi4js4sjsop0er655.apps.googleusercontent.com",
        clientSecret: "hV7VOphz0TaymfhnqdHl2YV7",
        refreshToken: "1//04hhUv6ftNOYdCgYIARAAGAQSNwF-L9IrPTW3kLuczISTY3UZZ7gt2UlCe107O4_9isZIJcTGP2HQaAN9SRMONRc49jMxxehAOf4",
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
                @media only screen and (min-width:480px){
                  .container{
                    max-width: 600px;
                  }
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
              <h1 align="center">We're thrilled to hear from you!</h1>
              <p class="para">Hi ` +
        fname +
        `,</p>
              <p class="para">We have received your submission to request access for ScriptChain platform and someone from the team will keep you updated once we get closer to launch. Thank you!</p>
         <br><br>
             <div class="panelFooter">
                <p align="center">This message was sent from ScriptChain LLC., Boston, MA</p>
              </div>
            </div>
            </body>
            </html>`
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error occurs");
        console.log(err);
      }
      transporter.close();
      console.log("Email sent!!!");
      console.log(data);
    });
  };

const mailer1 = (fname, email) => {
  //create a transporter with OAuth2
  const transporter1 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "moh@scriptchain.co",
      clientId: "903951478096-uctvse753g68mcaqi4js4sjsop0er655.apps.googleusercontent.com",
      clientSecret: "hV7VOphz0TaymfhnqdHl2YV7",
      refreshToken: "1//04hhUv6ftNOYdCgYIARAAGAQSNwF-L9IrPTW3kLuczISTY3UZZ7gt2UlCe107O4_9isZIJcTGP2HQaAN9SRMONRc49jMxxehAOf4",
      accessToken: accessToken
    }
  });

  //  create mail option with custom template, verification link and Json Web Token
  const mailOptions1 = {
    from: "noreply@scriptchain.co",
    to: "moh@scriptchain.co",
    subject: "New partner request",
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
              @media only screen and (min-width:480px){
                .container{
                  max-width: 600px;
                }
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
            <h1 align="center">We're thrilled to hear from you!</h1>
            <p class="para">Hi ` +
      fname +
      `,</p>
            <p class="para">We have received your submission to request access for ScriptChain platform and someone from the team will keep you updated once we get closer to launch. Thank you!</p>
        <br><br>
            <div class="panelFooter">
              <p align="center">This message was sent from ScriptChain LLC., Boston, MA</p>
            </div>
          </div>
          </body>
          </html>`
  };

  transporter1.sendMail(mailOptions1, (err, data) => {
    if (err) {
      console.log("Error occurs");
      console.log(err);
    }
    transporter1.close();
    console.log("Email sent!!!");
    console.log(data);
  });
};

module.exports = router;
