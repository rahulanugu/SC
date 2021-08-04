var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const aes256 = require('aes256');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// const API_KEY = process.env.API_KEY; => this method omits a few characters in the API Key. Don't know why!
const API_KEY = "scriptChain@13$67ahi1";
const key = 'hosenkinosumabeni';

console.log('API key is', API_KEY);
console.log('key is', key);
/* Helpers */

// JSON response generator to pass DB responses up to controllers
function jsonResponse(code, message, body={}) {
  return {'statusCode': code, 'message': message, 'body': body}
}

// Validate API key (decrypt and compare to local environment variable)
function APIkeyIsValid(key_) {
  console.log('API key is', API_KEY);
  console.log('decrypted key is', aes256.decrypt(key, key_));
  return API_KEY === aes256.decrypt(key, key_);
}

// Verify JWT asynchronously
function verifyJWT(userJWT) {
  return new Promise((resolve) => {
    jwt.verify(userJWT, "santosh", (err, decodedValue) => {
      if (err) {
        return resolve(jsonResponse(401, err.message));
      }
      resolve(jsonResponse(200, "Successfully verified JWT.", decodedValue));
    });
  });
}

// Sign JWT asynchronously
function createJWT(payload, expiresIn) {
  return new Promise((resolve) => {
    jwt.sign(payload, "santosh", { expiresIn: expiresIn }, (err, token) => {
      if (err) {
        return resolve(jsonResponse(400, err.message));
      }
      resolve(jsonResponse(200, "Successfully created JWT.", token));
    });
  });
}

/* Module definitions */

// Encrypt JWT
async function EncryptToken(payload, expiresIn = 300) {
  const res = await createJWT(payload, expiresIn);
  const encrypted = CryptoJS.AES.encrypt(res.body, 'secret key 123').toString();
  return encrypted;
}

// Decrypt JWT
async function DecryptToken(encrypted) {
  const bytes  = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  const res = await verifyJWT(decrypted);
  return res;
}

// Universal validator for all API requests
function APIRequestIsValid(req) {
  // Express validation, passed as array in second param of API's controller
  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.log('APIRequestNotValid err', valErr);
    return jsonResponse(400, 'Bad Request');
  }
  // Validate API key, received as query parameter
  const keyIsValid = APIkeyIsValid(req.query.API_KEY);
  if (!keyIsValid) {
    console.log("authorization failed");
    return jsonResponse(401, 'Authorization failed');
  }
  return jsonResponse(200, 'Validation passed.');
}

// Synchronous bcrypt password encrpytion wrapper; returns password comparison results
function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return resolve(jsonResponse(500, 'Encryption error'));
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return resolve(jsonResponse(500, 'Encryption error'));
        resolve(jsonResponse(200, 'Success', hash));
      });
    });
  });
}

// Synchronous bcrypt password validation wrapper; returns password comparison results
function passwordIsValid(password, encrypted) {
  console.log("compare", `${password}, ${encrypted}`);
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encrypted, (err, valid) => {
      if (err) return resolve(jsonResponse(500, 'Decryption error'));
      if (valid) return resolve(jsonResponse(200, 'Success'));
      resolve(jsonResponse(401, 'Incorrect username/password'));
    });
  });
  
}

module.exports.EncryptToken = EncryptToken;
module.exports.DecryptToken = DecryptToken;
module.exports.APIRequestIsValid = APIRequestIsValid;
module.exports.encryptPassword = encryptPassword;
module.exports.passwordIsValid = passwordIsValid;