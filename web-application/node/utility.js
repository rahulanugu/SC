var CryptoJS = require("crypto-js");
var Utility = {
    EncryptToken: function(message){
        var ciphertext = CryptoJS.AES.encrypt(message, 'secret key 123').toString();
        return ciphertext;
    },

    DecryptToken: function(message){
        var bytes  = CryptoJS.AES.decrypt(message, 'secret key 123');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }
}

module.exports = Utility