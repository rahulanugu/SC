const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
var { HealthcareProvider } = require('../models/healthcareProvider');
const { DeactivatedHealthcareProvider } = require('../models/deactivatedHealthcareProvider');



var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
const fs = require('fs');
/**
 * Authenticate the healthcare user login attempt
 * Input: Body containing username and password.
 * Output: Jwt token and 200 status on success or 401 on failure
 */
router.post('/',[check('emailAddress').notEmpty().isEmail(),check('password').notEmpty().exists()],async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
    try{
    console.log("Reached the login controller for the healthcare")
    console.log(req.body);
    //const healthcareProvider = await HealthcareProvider.findOne({ email: req.body.emailAddress });

    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.healthcareProviders` WHERE email=@email';
    // req.body.emailAddress+'"';
    const bigQueryOptions = {
      query: query,
      location: 'US',
      params: {email:req.body.emailAddress}
    }
    // console.log("require bigQueryoptions");
    bigquery.query(bigQueryOptions, async function(err, rows) {
      if(!err) {
        if(rows.length==0){
          const query1 = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedHealthcareProvider` WHERE email=@email';
          // req.body.emailAddress+'"';
          const bigQueryOptions1 = {
            query: query1,
            location: 'US',
            params: {email:req.body.emailAddress}
          }
          bigquery.query(bigQueryOptions1, function(err, rows1) {
            if(!err) {
              if(rows1.length==0){
                return res.status(404).json({
                  message:"Invalid Email or password"
                });
              }else{
                //Execution at this point means that the email being handled is deactivated patient
                return res.status(303).json({
                  message: "The email being handled has been deactivated"
                });
              }
            }
          });
        }else{
          //check for password
          console.log('test');
          const healthcareProvider = rows[0];

          const validpassword = await bcrypt.compare(req.body.password, healthcareProvider.password);

          if (!validpassword) return res.status(401).json({

              message: "Wrong password has been entered"
          });

          const token = jwt.sign({ _id: healthcareProvider._id, fname: healthcareProvider.firstName }, 'abc', { expiresIn: 60*60*3 });

          res.status(200).json({
              idToken: token,
              firstName: healthcareProvider.firstName
          });
        }
      }
    });
  }catch(e){
    console.log(e);
  }



})

/**
 * Checking if the user is authorized by verifying jwt token integrity
 * Input: JwtToken
 * Output: 200 on success , 401,400 on error
 */
router.post('/verifytokenintegrity', async(req, res) => {
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
