/**
 * user.js
 * Contains the database models for each type of user
 */
const mongoose = require('mongoose');

// create model for patient user
var VerifiedUser = mongoose.model('VerifiedUser', {
    fname: { type: String },
    lname: {type: String},
    email: {type : String},
}, 'verifieduser');

module.exports = { VerifiedUser };