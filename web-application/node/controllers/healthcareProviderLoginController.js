const express = require('express');
var router = express.Router();
const { check,body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db_utils = require('../db_utils');
const Utility = require('../utility');

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
    console.log("[INFO] Entered");
    //logger.info("Entered");
    /*const content = 'Entered'
    fs.writeFile('/Users/srikarpothumahanti/Desktop/scriptchain_new/scriptchain/web-application/node/test.log', content, err => {
      if (err) {
        console.error(err)
        return
      }
    })*/
    //Log format - Who searched it, Ip address and 
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      return res.status(400).json({message: 'Bad Request'})
    }
    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }

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
    if (resp.body.length === 0) {
      return res.status(404).json({message: "Invalid Email or password"});
    }
    // Provider found
    const healthcareProvider = resp.body[0];

    const validpassword = await bcrypt.compare(req.body.password, healthcareProvider.password);
    if (!validpassword) {
      return res.status(401).json({message: "Wrong password has been entered"});
    }
    // Create JWT
    const tokeBody = { _id: healthcareProvider._id, fname: healthcareProvider.firstName };
    const token = Utility.EncryptToken(tokeBody, 1800);
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
router.post('/verifytokenintegrity',[
  check("jwtToken").notEmpty(),
  body().custom(body => {
    const keys = ['jwtToken'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req,res) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      return res.status(400).json({message:'Bad Request'})
    }

    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }

    const decryptedToken = Utility.DecryptToken(req.body.jwtToken);
    if (decryptedToken['error']) {
      return res.status(401).json({message: decryptedToken['error_message']});
    }
    return res.status(200).json({message: "User is authorized"})
})

module.exports = router;
