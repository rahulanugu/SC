const express = require('express');
var router = express.Router();
const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');

const db_utils = require('../utils/db_utils');
const sec_utils = require('../utils/security_utils');

//const fs = require('fs')
/**
 * Authenticate the healthcare user login attempt
 * Input: Body containing username and password.
 * Output: Jwt token and 200 status on success or 401 on failure
 */

router.post('/',[
  check('email').notEmpty().isEmail(),
  check('password').notEmpty(),
  body().custom(body => {
    const keys = ['email', 'password'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    //logger.info("Entered");
    /*const content = 'Entered'
    fs.writeFile('/Users/srikarpothumahanti/Desktop/scriptchain_new/scriptchain/web-application/node/test.log', content, err => {
      if (err) {
        console.error(err)
        return
      }
    })*/
    //Log format - Who searched it, Ip address and 

    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      console.log('validate', validate);
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("[INFO] Entered");

    // Get provider from DB
    const resp = await db_utils.getRowByEmail('healthcareproviders', req.body.email);
    if (resp.statusCode != 200) {
      if (resp.statusCode === 500) { // DB error
        return res.status(500).json({message: resp.message});
      }
      // User not found, check if provider account has been deactivated
      const userExists = await db_utils.checkForUserInDB('deactivatedHealthcareProvider', req.body.emailAddress);
      if (userExists) {
        return res.status(303).json({message: "The email being handled has been deactivated"});
      }
      // No DB matches for credentials
      return res.status(404).json({message: "Invalid Email or password"});
    }
    console.log("HEALTHCARE PROVIDER", resp);
    // Provider found
    const healthcareProvider = resp.body;

    const passwordValidate = await sec_utils.passwordIsValid(req.body.password, healthcareProvider.password);
    if (passwordValidate.statusCode != 200) {
      return res.status(passwordValidate.statusCode).json({message: passwordValidate.message});
    }
    // Create JWT
    const tokeBody = { _id: healthcareProvider._id, fname: healthcareProvider.firstName };
    const token = await sec_utils.EncryptToken(tokeBody, 1800);
    return res.status(200).json({
      idToken: token,
      firstName: healthcareProvider.firstName
    });
});

/**
 * Checking if the user is authorized by verifying jwt token integrity
 * Input: JwtToken
 * Output: 200 on success , 401,400 on error
 */
router.get('/verifytokenintegrity/:jwtToken',[
  check("jwtToken").notEmpty(),
  body().custom(body => Object.keys(body).length == 0)
],
  async (req,res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const decryptedRes = await sec_utils.DecryptToken(req.params.jwtToken);
    if (decryptedRes.statusCode != 200) {
      return res.status(decryptedRes.statusCode).json({message: decryptedRes.message});
    }
    return res.status(200).json({message: "User is authorized"})
})

module.exports = router;
