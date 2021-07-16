const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
var objJson = {};

/* Controller route: localhost:3000/cache_service */

router.post('/storeInCache',(req, res) => {
  console.log("Inside cache service");
  const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
  if (!keyIsValid) {
    return res.status(401).json({message: 'Authorization failed'});
  }
  
  var code = req.body.code;
  var access_token = req.body.access_token;
  objJson[code] = access_token;
  return res.status(200).json({"message":"received"});
});

router.get('/getFromCache',(req, res) => {
  console.log("Getting code from cache");
  const keyIsValid = Utility.APIkeyIsValid(req.query.API_KEY);
  if (!keyIsValid) {
    return res.status(401).json({message: 'Authorization failed'});
  }

  const code = req.query.code;
  console.log(objJson[code]);
  return res.status(200).json(objJson[code]);
});

module.exports = router;
