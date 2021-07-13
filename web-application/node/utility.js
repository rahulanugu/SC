var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const aes256 = require('aes256');
const bcrypt = require('bcryptjs');

const API_KEY = process.env.API_KEY;
const key = process.env.KEY;

/* Helpers */

// JSON response generator to pass DB responses up to controllers
function jsonResponse(code, message, body={}) {
  return {'statusCode': code, 'message': message, 'body': body}
}

/* Module definitions */
var Utility = {

  EncryptToken: (payload, expiresIn = 300) => {
    const token = jwt.sign(payload, "santosh", { expiresIn: expiresIn });
    const encrypted = CryptoJS.AES.encrypt(token, 'secret key 123').toString();
    return encrypted;
  },

  DecryptToken: (encrypted) => {
    const bytes  = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    payload = {};
    jwt.verify(decrypted, "santosh", (err, decodedValue) => {
      if (err) {
        payload = {'error': true, 'error_message': err.message};
        return;
      }
      payload = decodedValue;
    });
    return payload;
  },

  APIkeyIsValid: (key_) => {
    return API_KEY === aes256.decrypt(key, key_);
  },
  // Synchronous bcrypt validation wrapper; returns password comparison results
  encryptPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return resolve(jsonResponse(500, 'Encryption error'));
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return resolve(jsonResponse(500, 'Encryption error'));
          resolve(jsonResponse(200, 'Success', hash));
        });
      });
    });
  },
  // Synchronous bcrypt validation wrapper; returns password comparison results
  passwordIsValid: (password, encrypted) => {
    console.log("compare", `${password}, ${encrypted}`);
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encrypted, (err, valid) => {
        if (err) return resolve(jsonResponse(500, 'Decryption error'));
        if (valid) return resolve(jsonResponse(200, 'Success'));
        resolve(jsonResponse(401, 'Incorrect username/password'));
      });
    });
  }
}

module.exports = Utility