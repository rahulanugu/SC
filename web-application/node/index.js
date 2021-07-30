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
const patientController = require("./controllers/patientController");
const caregiverController = require("./controllers/caregiverController");
const newUserController = require("./controllers/newUsersController");
const patientloginController = require("./controllers/patientLoginController");
const verifiedController = require("./controllers/verifiedController");
const contactUsController = require("./controllers/contactUsController");
const careersController = require("./controllers/careersController");
const resetPasswordController = require("./controllers/resetPasswordController");
const healthcareProviderController = require("./controllers/healthcareProviderController");
const healthcareProviderLoginController = require("./controllers/healthcareProviderLoginController");
const healthcareProviderResetPasswordController = require("./controllers/healthcareProviderResetPasswordController");
const deactivateController = require("./controllers/deactivateController");
const reactivateController = require("./controllers/reactivateController");
const editPatientController = require("./controllers/editPatientController")
const cacheController = require("./controllers/cacheController")
const partnersController = require("./controllers/partnersController")
const patientsNewController = require("./controllers/patientNewController")

var app = express();

// configure express middleware to send date to nodejs project
app.use(bodyParser.json());

//for production mode uncomment below code and for local(local requests are handled on 8080 alone if commented)
app.use(function (req, res, next) {

    //res.cookie('cookie','value',{signed:true});
    // Website you wish to allow to connect
    var whitelist = [
      'https://www.scriptchain.co',
      'https://scriptchain.co',
      'http://localhost:4200',
      'http://localhost:8080',
      'http://localhost:3000',
      '127.0.0.1'
      //'http://3.16.14.209:3000'
    ];
    var origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    if (req.hostname != 'localhost' && req.get('X-Forwarded-Proto') == 'http') {
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
app.use("/backend/healthcare/reset_password", healthcareProviderResetPasswordController);
app.use("/backend/deactivate", deactivateController )
app.use("/backend/reactivate", reactivateController )
app.use("/backend/editpatient", editPatientController)
app.use("/cache_service", cacheController)
app.use("/partners", partnersController)

//Uncomment out the below code in production mode and local mode.
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "./dist/my-app/index.html"));
});

// start express server
if (require.main === module) {
  app.listen(3000, () => console.log("Server started at port: 3000"));
}

module.exports = app;