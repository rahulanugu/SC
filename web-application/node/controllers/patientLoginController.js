const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var { Patient } = require('../models/user');


var router = express.Router();
//http request for patient login http://localhost:3000/patient-login/
router.post('/', async (req, res)=>{
    const patient = await Patient.findOne({Email: req.body.email});
    if(!patient) return res.status(200).json({
      message:"Invalid Email or password"
    });

    //check for password
    const validpassword = await bcrypt.compare(req.body.password, patient.password);
    if(!validpassword) return res.status(200).json({
      message:"Invalid username or password"
    });

    console.log('logged in');

    //form json tokens
    const token = jwt.sign({_id:patient._id,fname:patient.fname}, 'abc');
    
   
    res.status(200).json({
        idToken: token,
        fname:patient.fname
      });
});


module.exports = router;