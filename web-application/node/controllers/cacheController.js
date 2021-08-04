const express = require("express");
const router = express.Router();
const { check, body } = require('express-validator');

const sec_utils = require('../utils/security_utils');

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
    
    const resp = {
      code: req.body.code, 
      access_token: req.body.access_token,
      message: "Code successfully created."
    }
    objJson[resp.code] = resp.access_token;
    return res.status(200).json(resp);
});

router.get('/getFromCache', [
  body().custom(body => Object.keys(body).length == 0)
  ], 
  (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("Getting code from cache");
    
    const code = req.query.code;
    if (objJson[code] == null) {
      return res.status(400).json({message: "Bad request"})
    }

    const resp = {
      code: code, 
      access_token: objJson[code],
      message: "Code successfully retrieved."
    }

    console.log(resp);
    return res.status(200).json(resp);
});

module.exports = router;
