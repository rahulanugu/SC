const mongoose = require('mongoose');

var NewRequestAccessUser = mongoose.model('newRequestedAccessUser',{
    fname: { type: String },
    lname: {type: String},
    email: {type : String},
    typeOfUser: { type : String}
},'newusers');

module.exports = {NewRequestAccessUser};