const express = require("express");
const router = express.Router();
const { check, body } = require('express-validator');

const db_utils = require('../db_utils');
const sec_utils = require('../security_utils');

/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

router.post("/", [
  check('fname').notEmpty().isAlpha(),
  check('lname').notEmpty().isAlpha(),
  check('email').isEmail(),
  check('message').notEmpty(),
  body().custom(body => {
    const keys = ['fname','lname','email','message'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    
    const user = req.body;
    user['_id'] = generateId(10);
    // Add user object into contactUsers table
    const resp = await db_utils.insertUserIntoDB('contactUsers', user);
    console.log("TESTER", resp.statusCode, resp.message);
    let body = resp.body;
    body['message'] = resp.message;
    return res.status(resp.statusCode).json(body);
});

module.exports = router;
