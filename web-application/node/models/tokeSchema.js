const mongoose = require('mongoose');

const TokenSchema = mongoose.model('TokenSchema',{
    token: {type:String},
    email: {type:String}
},'tokenSchema');

module.exports={TokenSchema};