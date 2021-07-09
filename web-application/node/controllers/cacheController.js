const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
var aes256 = require('aes256');
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
var objJson = {};

router.post('/storeInCache',(req, res) => {
  console.log("Inside cache service");
  var code = req.body.code;
  var access_token = req.body.access_token;
  objJson[code] = access_token;
  //console.log(objJson);
  return res.status(200).json({"message":"received"});
});
//localhost:3000/cache_service/getFromCache
router.get('/getFromCache',(req, res) => {
  //console.log(objJson);
  const code = req.query.code;
  console.log(objJson[code]);
  return res.status(200).json(objJson[code]);
});

module.exports = router;
