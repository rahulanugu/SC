const express = require('express');
var router = express.Router();
const { check, body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var aes256 = require('aes256');
const jwt = require('jsonwebtoken');

const Utility = require('../utility');
const db_utils = require('../db_utils');
//const {BigQuery} = require('@google-cloud/bigquery');
/*const options = {
  keyFilename: 'serviceAccountKeys/scriptchain-259015-689b82dcb0fe.json',
  projectId: 'scriptchain-259015'

};
const bigquery = new BigQuery(options);*/
//const bigquery = new BigQuery();
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
//http request for patient login http://localhost:3000/patient-login/
/**
 * This method validates the user/patient to log in to the portal.
 * Input: Body, will contain email and the password of the user
 * Output: 401 - Invalid password or email
 *         200 - Jwt Token and first name
 */

router.post('/',[
  check('email').notEmpty().isEmail(),
  check('password').notEmpty(),
  body().custom(body => {
    const keys = ['email','password'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    console.log(req.query);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }

    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    db_utils.getUserFromDB('patients', req.body.email).then(resp => {
      if (resp.statusCode != 200) {
        db_utils.checkForUserInDB('deactivatedPatients', req.body.email).then(userWasActive => {
          if (userWasActive) {
            res.status(303).json({
              message: "The email being handled has been deactivated"
            });
          } else {
            res.status(404).json({
              message:"Invalid username or password"
            });
          }
        });
        return;
      }
      const patient = resp.body;

      const validpassword = await bcrypt.compare(req.body.password, patient.password);
      if (!validpassword) {
        return res.status(404).json({
          message:"Invalid username or password"
        });
      }
      
      console.log('logged in');
      //form json tokens
      const tokeBody = {_id: patient._id, fname: patient.fname};
      const token = Utility.EncryptToken(tokeBody);

      return res.status(200).json({
        idToken: token,
        fname: patient.fname,
        email: patient.email
      });
    });
});

router.post('/verifytokenintegrity',[
  check("jwtToken").notEmpty(),
  body().custom(body => {
    console.log("Begin verifying token integrity")
    const keys = ['jwtToken'];
    return Object.keys(body).every(key => keys.includes(key));
  })], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }

    console.log("Verifying the integrity of the jwt token")
    console.log(req.body.jwtToken);

    payload = Utility.DecryptToken(req.body.jwtToken);
    if (payload['error']) {
      console.log("an error has occured")
      return res.status(401).json({message: "Unauthorized user"}).end();
    }
    return res.status(200).json({message: "User is authorized"}).end();
})


module.exports = router;
