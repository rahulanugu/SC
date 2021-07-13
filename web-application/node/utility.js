var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const aes256 = require('aes256');

const API_KEY = process.env.API_KEY;
const key = process.env.KEY;

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
  }
}

module.exports = Utility