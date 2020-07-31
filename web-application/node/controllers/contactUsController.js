const express = require("express");
const { check,body, validationResult } = require('express-validator');
const router = express.Router();
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');

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

router.post("/",[check('fname').notEmpty().isAlpha(),check('lname').notEmpty().isAlpha(),check('email').isEmail(),check('message').notEmpty(),body().custom(body => {
  const keys = ['fname','lname','email','message'];
  return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Some extra parameters are sent')],async(req, res) => {
  const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).send(err.array({ onlyFirstError: true }))

  console.log("hello");
  req.body['_id'] = generateId(10);
  const filename = 'contactUserTmp.json';
  const datasetId = 'ScriptChain';
  const tableId = 'contactUsers';

  fs.writeFileSync(filename, JSON.stringify(req.body));

  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId).load(filename);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    res.status(500).json({
      message: "An error has occured trying to process your request"
    })
  }else{
    console.log(`Job ${job.id} completed.`);
    res.status(200).json({
      message: "Your message has been saved"
    });
  }
});
module.exports = router;
