/**
 * user.js
 * Contains the database models for each type of user
 */
const mongoose = require('mongoose');

// create model for patient user
var Subscriber = mongoose.model('Subscriber', {
    fname: { type: String },
    lname: {type: String},
    email: {type : String},
    typeOfUser: { type : String}
}, 'subscriber');

module.exports = { Subscriber };