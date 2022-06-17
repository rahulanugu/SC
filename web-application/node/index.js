/**
 * index.js
 * Main driver of the node.js server
 * Starts the server and adds the routes created in the controllers
 */

// package import
const config = require('./config.js');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
// local import
var patientController = require("./controllers/patientController");
var caregiverController = require("./controllers/caregiverController");
var newUserController = require("./controllers/newUsersController");
var patientloginController = require("./controllers/patientLoginController");
var verifiedController = require("./controllers/verifiedController");
var contactUsController = require("./controllers/contactUsController");
var careersController = require("./controllers/careersController");
var resetPasswordController = require("./controllers/resetPasswordController");
var healthcareProviderController = require("./controllers/healthcareProviderController");
var healthcareProviderLoginController = require("./controllers/healthcareProviderLoginController");
var healthcareProviderResetPasswordController = require("./controllers/healthcareProviderResetPasswordController");
var deactivateController = require("./controllers/deactivateController");
var reactivateController = require("./controllers/reactivateController");
var editPatientController = require("./controllers/editPatientController");
var cacheController = require("./controllers/cacheController");
var partnersController = require("./controllers/partnersController");
var patientsNewController = require("./controllers/patientNewController");
const mailer_oauth = require('./utils/mailer_oauth');
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

console.log(`NODE_ENV=${config.NODE_ENV}`);

var app = express();

// configure express middleware to send date to nodejs project
app.use(bodyParser.json());

/*var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com",
  user     : "admin",
  password : "Scriptchain20!",
  port     : 3306
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();
*/
//for local deploy uncomment below code & comment out for production
//allow cors to access port that angular app runs on

//Comment this in local as well. Requests are not being handled
//Also on port 8080, testing of API is bad. Console.log isn't working
//Only when requests come from 4200(UI), console.log is working
//Finally, it's important to serve static comment for testing of few APIs.

/*app.use(
   cors({
     origin: "http://scriptchain.co"
   })
 );

 app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
 });*/
//app.use(require('cookie-parser')('hosenkinosumabeni'))
//for production mode uncomment below code and for local(local requests are handled on 8080 alone if commented)
app.use(function (req, res, next) {
  //res.cookie('cookie','value',{signed:true});
  // Website you wish to allow to connect
  var whitelist = [
    "https://dev.scriptchain.co",
    "https://www.scriptchain.co",
    "https://scriptchain.co",
    "http://localhost:4200",
    "http://localhost:8080",
    "http://localhost:3000",
    "127.0.0.1",
    //'http://3.16.14.209:3000'
  ];
  var origin = req.headers.origin;
  if (whitelist.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.hostname != "localhost" && req.get("X-Forwarded-Proto") == "http") {
    res.redirect(`https://${req.host}${req.url}`);
    return;
  }

  // Pass to next layer of middleware
  next();
});

//Uncomment out the below code in production mode and local mode.
app.use(express.static(path.join(__dirname, "./dist/my-app")));

// add router from patient controller
app.use("/patient", patientController);
app.use("/caregiver", caregiverController);
app.use("/patientnew", patientsNewController);
app.use("/patient-login", patientloginController);
app.use("/request_access", newUserController);
app.use("/verified", verifiedController);
app.use("/contact_us", contactUsController);
app.use("/careers", careersController);
app.use("/reset_password", resetPasswordController);
app.use("/backend/healthcare", healthcareProviderController);
app.use("/backend/healthcare-login", healthcareProviderLoginController);
app.use(
  "/backend/healthcare/reset_password",
  healthcareProviderResetPasswordController
);
app.use("/backend/deactivate", deactivateController);
app.use("/backend/reactivate", reactivateController);
app.use("/backend/editpatient", editPatientController);
app.use("/cache_service", cacheController);
app.use("/partners", partnersController);

// const oauth2Client = mailer_oauth.getClient();
// const accessToken = oauth2Client.getAccessToken();

app.post("/sendEmail", async (req, res) => {
  // var data = req.body;
  // var transporter = nodemailer.createTransport({
  //   service: "outlook365",
  //   auth: {
  //     user: "shah444@purdue.edu",
  //     pass: "krishna18",
  //   },
  // });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: "moh@scriptchain.co",
      clientId: "903951478096-c71h0t50i0rnnb8vnq0asaqhmrcp0l1j.apps.googleusercontent.com",
      clientSecret: "vMUSoWSvx4A7hH1fTGoQbNFM",
      refreshToken: "1//04vP3OUukrfheCgYIARAAGAQSNwF-L9IrqyBU45KpNdua_rhjOsCJMkULG90ThRS5xcSrG4dX2BvHRVXjO_bdq9EB1KPsuza9eUw",
      accessToken: "ya29.a0ARrdaM80kJkjFBdcuvsO3-50z3rZ35lXQJxdQeOT2uepbXtS242C6eh1us-EyLXPHF_pl9EzRpa7WPZkvKQO2EtMHS2R_fTpzFQnF-zXeroYFs-QYl1jm1kiLJf38R4WRCEhACW2ydnRWT3_oaHSQS57W-7j"
    }
  });

  let html = await readFile(req.body.template, "utf8");
  const emailConfig = {
    from: "moh@scriptchain.co",
    to: req.body.email,
    subject: req.body.subject,
    html: html,
    // attachments: [
      // {
      //   filename: "welcome.svg",
      //   path: __dirname + "/assets/welcome.svg",
      //   cid: "welcome",
      // },
      // {
      //   filename: "scriptchain-health-logo.svg",
      //   path: __dirname + "/assets/scriptchain-health-logo.svg",
      //   cid: "logo",
      // },
      // {
      //   filename: "verification.svg",
      //   path: __dirname + "/assets/verification.svg",
      //   cid: "verification",
      // },
    // ],
    // to: data.email,
    // subject: data.subject,
    // html: data.template,
  };
  transporter.sendMail(emailConfig, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });

  res.status(200).send("Email sent");
});

//Uncomment out the below code in production mode and local mode.
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "./dist/my-app/index.html"));
});

// start express server
if (require.main === module) {
  app.listen(3000, () => console.log("Server started at port: 3000"));
}

module.exports = app;
