var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
var Utility = {

  EncryptToken: function(payload, expiresIn = 300){
    const token = await jwt.sign(payload, "santosh", { expiresIn: expiresIn });
    const encrypted = CryptoJS.AES.encrypt(token, 'secret key 123').toString();
    return encrypted;
  },

  DecryptToken: function(encrypted){
    const bytes  = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    payload = {};
    jwt.verify(decrypted, "santosh", (err, decodedValue) => {
      if (err) {
        payload = {'error': true, 'error_message': err.message};
        return;
      }
      payload = decodedValue;
      payload['error'] = false;
    });
    return payload;
  }
}

module.exports = Utility