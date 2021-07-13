const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');

const db_utils = require('../db_utils');
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
  check('FirstName').notEmpty().isAlpha(),
  check('LastName').notEmpty().isAlpha(),
  check('Email').isEmail(),
  check('Message').notEmpty(),
  body().custom(body => {
    const keys = ['FirstName','LastName','Email','Message'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const valErr = validationResult(req);
    if( !valErr.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }

    const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
    if (!keyIsValid) {
      return res.status(401).json({message: 'Authorization failed'});
    }
    
    const user = req.body;
    user['_id'] = generateId(10);
    // Add user object into contactUsers table
    const resp = db_utils.insertUserIntoDB('contactUsers', user);
    let body = resp.body;
    body['message'] = resp.message;
    return res.status(resp.statusCode).json(body);
});

module.exports = router;
