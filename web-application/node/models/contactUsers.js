const mongoose = require('mongoose');

var ContactUser = mongoose.model('User',{
    fname: { type: String },
    lname: {type: String},
    email: {type : String},
    message: { type : String}
},'contactUsers');

module.exports = {ContactUser};