const express = require("express");
const router = express.Router();
const { check, body } = require('express-validator');

const sec_utils = require('../security_utils');

var objJson = {};

/* Controller route: localhost:3000/cache_service */

router.post('/storeInCache', [
  body().custom(body => {
    const keys = ['code'];
    return Object.keys(body).every(key => keys.includes(key));
  })
  ], 
  (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("Inside cache service");
    
    var code = req.body.code;
    var access_token = req.body.access_token;
    objJson[code] = access_token;
    return res.status(200).json({"message":"received"});
});

router.get('/getFromCache', [
  body().isEmpty()
  ], 
  (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("Getting code from cache");

    const code = req.query.code;
    console.log(objJson[code]);
    return res.status(200).json(objJson[code]);
});

module.exports = router;
