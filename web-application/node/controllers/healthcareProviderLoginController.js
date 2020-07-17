const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
var { HealthcareProvider } = require('../models/healthcareProvider');
const { DeactivatedHealthcareProvider } = require('../models/deactivatedHealthcareProvider');



var router = express.Router();
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);

/**
 * Authenticate the healthcare user login attempt
 * Input: Body containing username and password.
 * Output: Jwt token and 200 status on success or 401 on failure
 */
router.post('/', async (req, res) => {
    console.log("Reached the login controller for the healthcare")
    console.log(req.body);
    const healthcareProvider = await HealthcareProvider.findOne({ email: req.body.emailAddress });

    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.healthcareProvider` WHERE email='+'"'+
    req.body.emailAddress+'"';
    bigquery.query(query, function(err, rows) {
      if(!err) {
        if(!rows){
          const query1 = 'SELECT * FROM `scriptchainprod.ScriptChain.deactivatedHealthcareProvider` WHERE email='+'"'+
          req.body.emailAddress+'"';
          bigquery.query(query1, function(err, rows1) {
            if(!err) {
              if(!rows1){
                return res.status(404).json({
                  message:"Invalid Email or password"
                });
              }else{
                //Execution at this point means that the email being handled is deactivated patient
                return res.status(303).json({
                  message: "The email beong handled has been deactivated"
                }); 
              }
            }
          });
        }
      }
    });

    
  

    //check for password

    const validpassword = await bcrypt.compare(req.body.password, healthcareProvider.password);

    if (!validpassword) return res.status(401).json({

        message: "Wrong password has been entered"
    });

    const token = jwt.sign({ _id: healthcareProvider._id, fname: healthcareProvider.firstName }, 'abc', { expiresIn: 60*60*3 });

    res.status(200).json({
        idToken: token,
        firstName: healthcareProvider.firstName
    });


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
