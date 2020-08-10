const express = require('express');
const { check,body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
//http request for patient login http://localhost:3000/patient-login/
/**
 * This method validates the user/patient to log in to the portal.
 * Input: Body, will contain email and the password of the user
 * Output: 401 - Invalid password or email
 *         200 - Jwt Token and first name
 */
router.post('/',[check('email').notEmpty().isEmail(),check('password').notEmpty(),body().custom(body => {
  const keys = ['email','password'];
  return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Some extra parameters are sent')],async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
    //const patient = await Patient.findOne({Email: req.body.email});
    //if the patient is not found, try finding it in the deactivated patients collection

    const query1 = 'SELECT * FROM `scriptchainprod.ScriptChain.patients` WHERE Email=@email';
    const bigQueryOptions1={
      query:query1,
      location: 'US',
      params: {email:req.body.email}
    }


    bigquery.query(bigQueryOptions1, async function(err, patient) {
      if (!err) {
        if (patient.length==0){
          const query2 = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedPatients` WHERE Email=@email';
          const bigQueryOptions2={
            query:query2,
            location: 'US',
            params: {email:req.body.email}
          }
          bigquery.query(bigQueryOptions2, function(err1, deactivatedPatient) {
            if (!err1) {
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
        }else{
          const validpassword = await bcrypt.compare(req.body.password, patient[0].password);

          if(!validpassword) return res.status(401).json({

            message:"Invalid username or password"
          });

          console.log('logged in');

          //form json tokens
          const token = jwt.sign({_id:patient[0]._id,fname:patient[0].fname}, 'abc');


          res.status(200).json({
              idToken: token,
              fname:patient[0].fname,
              email:patient[0].Email
            });
        }
      }else{
        console.log(err);
      }
    });
});


module.exports = router;