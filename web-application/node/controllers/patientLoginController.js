const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
var { Patient } = require('../models/user');
const { DeactivatedPatient } = require('../models/deactivatedUser');


var router = express.Router();
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

    if(!patient){
      const deactivatedPatient = await DeactivatedPatient.findOne({Email: req.body.email});

      if(!deactivatedPatient){
        //patient not in both patient collection and deactivated collection
        return res.status(404).json({
          message:"Invalid Email or password"
        });
      }

      //Execution at this point means that the email being handled is deactivated patient
      return res.status(303).json({
        message: "The email beong handled has been deactivated"
      }); 
    }

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