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
  
  const retrievedPatient = await Patient.findOne({Email: req.body.email})

  if(retrievedPatient){
    retrievedPatient.fname = req.body.fname;
    const updatedPatient = await Patient.replaceOne({Email: req.body.email}, retrievedPatient, 
      (err, response) => {
        if(err){
          res.status(500).json({"message": "An error has occured trying to update the patient record in the dattabase"});
        }
        res.status(200).json({"messafe": "Succesfully updatted the patient record in the database"});
      })
  } else {
    res.status(404).json({"messsage" : "Email not found"})
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
  
  const retrievedPatient = await Patient.findOne({Email: req.body.email})

  if(retrievedPatient){
    retrievedPatient.lname = req.body.lname;
    const updatedPatient = await Patient.replaceOne({Email: req.body.email}, retrievedPatient, 
      (err, response) => {
        if(err){
          res.status(500).json({"message": "An error has occured trying to update the patient record in the dattabase"});
        }
        res.status(200).json({"messafe": "Succesfully updatted the patient record in the database"});
      })
  } else {
    res.status(404).json({"messsage" : "Email not found"})
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
  
  const retrievedPatient = await Patient.findOne({Email: req.body.email})

  if(retrievedPatient){
    retrievedPatient.phone = req.body.phone;
    const updatedPatient = await Patient.replaceOne({Email: req.body.email}, retrievedPatient, 
      (err, response) => {
        if(err){
          res.status(500).json({"message": "An error has occured trying to update the patient record in the dattabase"});
        }
        res.status(200).json({"messafe": "Succesfully updatted the patient record in the database"});
      })
  } else {
    res.status(404).json({"messsage" : "Email not found"})
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
  const retrievedPatient = await Patient.findOne({Email: req.body.email})

  const validpassword = await bcrypt.compare(req.body.oldPassword, retrievedPatient.password);

  if(!validpassword) return res.status(401).json({

    message:"The old password that has been entered is incorrect"
  });

  if(validpassword){

    console.log("The entered old password is correct")
    console.log(req.body.newPassword)
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(req.body.newPassword, salt);
    retrievedPatient.password = hashpassword;
    const updatedPatient = await Patient.replaceOne({Email: req.body.email}, retrievedPatient, 
      (err, response) => {
        if(err){
          res.status(500).json({"message": "An error has occured trying to update the patient record in the dattabase"});
        }
        res.status(200).json({"message": "Succesfully updatted the patient record in the database"});
      })
  } else {
    res.status(404).json({"messsage" : "Email not found"})
  }

});
module.exports = router;
