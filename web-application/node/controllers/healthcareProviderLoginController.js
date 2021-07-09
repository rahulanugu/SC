const express = require('express');
const { check,body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
var aes256 = require('aes256');
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
const db_utils = require('../db_utils');
const Utility = require('../utility');

//const fs = require('fs')
/**
 * Authenticate the healthcare user login attempt
 * Input: Body containing username and password.
 * Output: Jwt token and 200 status on success or 401 on failure
 */

router.post('/',[
  check('emailAddress').notEmpty().isEmail(),
  check('password').notEmpty(),
  body().custom(body => {
    const keys = ['emailAddress', 'password'];
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
    // console.log("Reached the login controller for the healthcare")
    //console.log(req.body);
    //const healthcareProvider = await HealthcareProvider.findOne({ email: req.body.emailAddress });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: 'Bad Request'})
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    //console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    // Get provider from DB
    db_utils.getRowByEmail('healthcareProviders', req.body.emailAddress).then(resp => {
      if (resp.statusCode != 200) {
        if (resp.statusCode === 500) {
          return res.status(500).json({message: resp.message});
        }
        // User not found, check if provider account has been deactivated
        db_utils.checkForUserInDB('deactivatedHealthcareProvider', req.body.emailAddress).then(userExists => {
          if (userExists) {
            return res.status(303).json({message: "The email being handled has been deactivated"});
          }
          // No DB matches for credentials
          return res.status(404).json({message: "Invalid Email or password"});
        });
        return;
      }
      // Provider found
      const healthcareProvider = resp.body;

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message:'Bad Request'})
    }
    //console.log("Verifying the integrity of the jwt token")
    //console.log(req.body.jwtToken);
    payload = Utility.DecryptToken(req.body.jwtToken);

    if (payload['error']) {
      console.log("A JWT error has occured")
      return res.status(401).json({message: "Unauthorized user"}).end()
    }
    return res.status(200).json({message: "User is authorized"}).end()
})

module.exports = router;
