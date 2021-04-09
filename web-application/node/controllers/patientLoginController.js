const express = require('express');
const { check,body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
//const {BigQuery} = require('@google-cloud/bigquery');
/*const options = {
  keyFilename: 'serviceAccountKeys/scriptchain-259015-689b82dcb0fe.json',
  projectId: 'scriptchain-259015'

};
const bigquery = new BigQuery(options);*/
//const bigquery = new BigQuery();
var aes256 = require('aes256');
const API_KEY = "scriptChain@13$67ahi1";
const key = "hosenkinosumabeni";
//http request for patient login http://localhost:3000/patient-login/
/**
 * This method validates the user/patient to log in to the portal.
 * Input: Body, will contain email and the password of the user
 * Output: 401 - Invalid password or email
 *         200 - Jwt Token and first name
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Scriptchain20!',
  port: 3306,
  database: 'scriptchain'
});
router.post('/',[check('email').notEmpty().isEmail(),check('password').notEmpty(),body().custom(body => {
  const keys = ['email','password'];
  return Object.keys(body).every(key => keys.includes(key));
})],async (req, res) => {
  console.log(req.query);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
    //const patient = await Patient.findOne({Email: req.body.email});
    //if the patient is not found, try finding it in the deactivated patients collection
    var ip = req.connection.remoteAddress;
    console.log(ip+" "+req.body.email);

    const query1 = 'SELECT * FROM `patients` WHERE Email=?';
    connection.query(query1,[req.body.email], async function(err, patient) {
      if (!err) {
        if (patient.length==0){
          const query2 = 'SELECT * FROM `deactivatedPatients` WHERE Email=?';
          connection.query(query2,[req.body.email], function(err1, deactivatedPatient) {
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

router.post('/verifytokenintegrity',[check("jwtToken").notEmpty(),body().custom(body => {
   console.log("Begin verifying token integrity")
  const keys = ['jwtToken'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }


    console.log("Verifying the integrity of the jwt token")
    console.log(req.body.jwtToken);
    try {
        payload = jwt.verify(req.body.jwtToken, "abc")
        return res.status(200).json({message: "User is authorized"}).end()
      } catch (e) {
          console.log("an error has occured")
        if (e instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({message: "Unauthorized user"}).end()
        }
        return res.status(400).json({message: "Bad request"}).end()
      }
})


module.exports = router;
