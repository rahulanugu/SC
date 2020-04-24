/**
 * index.js
 * Main driver of the node.js server
 * Starts the server and adds the routes created in the controllers
 */

// package import
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// local import
const { mongoose } = require("./db");
var patientController = require("./controllers/patientController");
var newUserController = require("./controllers/newUsersController");
var patientloginController = require("./controllers/patientLoginController");
var verifiedController = require("./controllers/verifiedController");
var contactUsController = require("./controllers/contactUsController");
var careersController = require("./controllers/careersController");
var resetPasswordController = require("./controllers/resetPasswordController");
var healthcareProviderController = require("./controllers/healthcareProviderController");
var healthcareProvideLoginController = require("./controllers/healthcareProviderLoginController");
var healthcareProviderResetPasswordController = require("./controllers/healthcareProviderResetPasswordController");
var deactivateController = require("./controllers/deactivateController");
var reactivateController = require("./controllers/reactivateController");
var editPatientController = require("./controllers/editPatientController")
var app = express();

// configure express middleware to send date to nodejs project
app.use(bodyParser.json());

//for local deploy uncomment below code & comment out for production
//allow cors to access port that angular app runs on
// app.use(
//   cors({
//     origin: "http://localhost:4200"
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
// });

//for production mode uncomment below code & comment out for local


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  if (req.host != 'localhost' && req.get('X-Forwarded-Proto') == 'http') {
    res.redirect(`https://${req.host}${req.url}`);
    return;
  }

  // Pass to next layer of middleware
  next();
});

//Uncomment out the below code in production mode.
app.use(express.static(path.join(__dirname, "./dist/my-app")));

// start express server
app.listen(8080, () => console.log("Server started at port: 8080"));

// add router from patient controller
app.use("/patient", patientController);
app.use("/patient-login", patientloginController);
app.use("/request_access", newUserController);
app.use("/verified", verifiedController);
app.use("/contact_us", contactUsController);
app.use("/careers", careersController);
app.use("/reset_password", resetPasswordController);
app.use("/backend/healthcare",healthcareProviderController);
app.use("/backend/healthcare-login",healthcareProvideLoginController);
app.use("/backend/healthcare/reset_password", healthcareProviderResetPasswordController);
app.use("/backend/deactivate", deactivateController )
app.use("/backend/reactivate", reactivateController )
app.use("/backend/editpatient" , editPatientController)

//Uncomment out the below code for production mode.
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "./dist/my-app/index.html"));
});
