const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
var aes256 = require('aes256');
const API_KEY = "scriptChain@13$67ahi1";
const key = "hosenkinosumabeni";
var objJson = {};

router.post('/storeInCache',(req, res) => {
  console.log("Inside cache service");
  var code = req.body.code;
  var access_token = req.body.access_token;
  objJson[code]=access_token;
  //console.log(objJson);
  res.status(200).json({"message":"received"});
});

router.get('/getFromCache',(req, res) => {
  //console.log(objJson);
  const code = req.query.code;
  console.log(objJson[code]);
  res.status(200).json(objJson[code]);
});

module.exports = router;
