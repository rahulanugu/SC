const express = require("express");
const { check,body, validationResult } = require('express-validator');
const router = express.Router();
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
//comment options in prod mode
const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);
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

router.post("/",[check('FirstName').notEmpty().isAlpha(),check('LastName').notEmpty().isAlpha(),check('Email').isEmail(),check('Message').notEmpty(),body().custom(body => {
  const keys = ['FirstName','LastName','Email','Message'];
  return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Some extra parameters are sent')],async(req, res) => {
  const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).send(err.array({ onlyFirstError: true }))
  //console.log("hello");
  req.body['_id'] = generateId(10);

  var query= "INSERT INTO `scriptchainprod.ScriptChain.contactUsers` VALUES ("
  for(var myKey in req.body) {
    query+="'"+req.body[myKey]+"', ";
  }
  query = query.slice(0,query.length-2);
  query += ")";
  console.log(query);
  const bigQueryOptions = {
    query: query,
    location: 'US'
  }
  bigquery.query(bigQueryOptions, function(err, row) {
    if(!err) {
        console.log("In contactUsController[root, POST]: Inserted successfully");;
        res.status(200).json({
          message: "Your message has been saved"
        });
    }else{
      console.log(err);
      res.status(500).json({
        message: "An error has occured trying to process your request"
      })
    }
  });
});
module.exports = router;