const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
var { Patient } = require('../models/user');
const { DeactivatedPatient } = require('../models/deactivatedUser');


var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
//http request for patient login http://localhost:3000/patient-login/
/**
 * This method validates the user/patient to log in to the portall.
 * Input: Body, will contain email and the password of the user
 * Output: 401 - Invalid password or email
 *         200 - Jwt Token and first name
 */
router.post('/', async (req, res)=>{
    const patient = await Patient.findOne({Email: req.body.email});
    //if the patient is not found, try finding it in the deactivated patients collection

    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.patient` WHERE Email='+'"'+req.body.email+'"';
    bigquery.query(query, function(err, patient) {
      if (!err) {
        if (!patient){
          const query = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedPatients` WHERE Email='+
          '"'+req.body.email+'"';
          bigquery.query(query, function(err, deactivatedPatient) {
            if (!err) {
              if (!deactivatedPatient){
                return res.status(404).json({
                  message:"Invalid Email or password"
                });
              }else{
                return res.status(303).json({
                  message: "The email being handled has been deactivated"
                }); 
              }
            }
          });
        }
      }
    });


    //check for password
    const validpassword = await bcrypt.compare(req.body.password, patient.password);

    if(!validpassword) return res.status(401).json({

      message:"Invalid username or password"
    });

    console.log('logged in');

    //form json tokens
    const token = jwt.sign({_id:patient._id,fname:patient.fname}, 'abc');
    
   
    res.status(200).json({
        idToken: token,
        fname:patient.fname,
        email:patient.Email
      });
});


module.exports = router;