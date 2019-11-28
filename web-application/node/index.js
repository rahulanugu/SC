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
var app = express();

// configure express middleware to send date to nodejs project
app.use(bodyParser.json());

// allow cors to access port that angular app runs on
app.use(
  cors({
    origin: "http://localhost:4200"
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
// });

//Uncomment out the below code in production mode.
// app.use(express.static(path.join(__dirname, "./dist/my-app")));

// start express server
app.listen(3000, () => console.log("Server started at port: 8080"));

// add router from patient controller
app.use("/patient", patientController);
app.use("/patient-login", patientloginController);
app.use("/request_access", newUserController);
app.use("/verified", verifiedController);
app.use("/contact_us", contactUsController);

//Uncomment out the below code for production mode.
// app.get("*", (req, res) => {
//   return res.sendFile(path.join(__dirname, "./dist/my-app/index.html"));
// });
