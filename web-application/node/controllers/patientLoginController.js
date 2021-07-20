const express = require('express');
var router = express.Router();
const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');

const sec_utils = require('../security_utils');
const db_utils = require('../db_utils');
//const {BigQuery} = require('@google-cloud/bigquery');
/*const options = {
  keyFilename: 'serviceAccountKeys/scriptchain-259015-689b82dcb0fe.json',
  projectId: 'scriptchain-259015'

};
const bigquery = new BigQuery(options);*/
//const bigquery = new BigQuery();

//http request for patient login http://localhost:3000/patient-login/
/**
 * This method validates the user/patient to log in to the portal.
 * Input: Body, will contain email and the password of the user
 * Output: 200 - Jwt Token and first name
 *         303 - Account deactivated
 *         400 - Bad request
 *         401 - Authorization failed; invalid password, email, API key, or JWT
 *         500 - DB error
 */

router.post('/',[
  check('email').notEmpty().isEmail(),
  check('password').notEmpty(),
  body().custom(body => {
    const keys = ['email','password'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    // Get patient from db
    const resp = await db_utils.getRowByEmail('patients', req.body.email);
    if (resp.statusCode != 200) {
      // Check for patient in deactivatedPatients table in db
      const userWasActive = await db_utils.checkForUserInDB('deactivatedPatients', req.body.email);
      if (userWasActive) {
        return res.status(303).json({message: "The email being handled has been deactivated"});
      }
      return res.status(404).json({message:"Invalid username or password"});
    }
    const patient = resp.body;

    const validpassword = await bcrypt.compare(req.body.password, patient.password);
    if (!validpassword) {
      return res.status(404).json({message:"Invalid username or password"});
    }
    console.log('logged in');
    
    // Get JWT using id, name, email
    const tokeBody = {_id: patient._id, fname: patient.fname, email: patient.email};
    const token = sec_utils.EncryptToken(tokeBody);

    return res.status(200).json({
      idToken: token,
      fname: patient.fname,
      email: patient.email
    });
});

/**
 * Verify JWT
 * Input: Body - JWT token
 * Output: 200 - Verification successful
 *         400 - Bad request
 *         401 - Authorization failed; invalid password, email, API key, or JWT
 *         500 - DB error
 */
router.post('/verifytokenintegrity',[
  check("jwtToken").notEmpty(),
  body().custom(body => {
    console.log("Begin verifying token integrity")
    const keys = ['jwtToken'];
    return Object.keys(body).every(key => keys.includes(key));
  })], 
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const decryptedToken = sec_utils.DecryptToken(req.body.token);
    if (decryptedToken['error']) {
      return res.status(401).json({message: decryptedToken['error_message']});
    }
    return res.status(200).json({message: "User is authorized"});
})


module.exports = router;
