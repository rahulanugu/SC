const express = require("express");
const { check,body, validationResult } = require('express-validator');
const router = express.Router();
const API_KEY = "scriptChain@13$67ahi1";
const {BigQuery} = require('@google-cloud/bigquery');
//comment options in prod mode
const options = {
    keyFilename: 'serviceAccountKeys/scriptchain-259015-689b82dcb0fe.json',
    projectId: 'scriptchain-259015'

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
})],async(req, res) => {
  const err = validationResult(req);
  if(!err.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  console.log(req.query);
  if(req.query.API_KEY!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  //console.log("hello");
  req.body['_id'] = generateId(10);

  var query= "INSERT INTO `scriptchain-259015.dataset1.contactUsers` VALUES ("
  for(var myKey in req.body) {
    query+="@"+myKey+",";

  }
  query = query.slice(0,query.length-1);
  query += ")";
  console.log(query);
  const bigQueryOptions = {
    query: query,
    params: req.body
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
