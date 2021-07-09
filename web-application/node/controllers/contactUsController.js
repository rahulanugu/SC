const express = require("express");
const { check,body, validationResult } = require('express-validator');
const router = express.Router();
//comment options in prod mode
var aes256 = require('aes256');
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
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
    const err = validationResult(req);
    if( !err.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }

    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }
    const user = req.body;
    user['_id'] = generateId(10);
    // Add user object into contactUsers table
    db_utils.insertUserIntoDB('contactUsers', user).then(resp => {
      let body = resp.body;
      body['message'] = resp.message;
      return res.status(resp.statusCode).json(body);
    });
});
module.exports = router;
