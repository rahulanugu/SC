const mongoose = require('mongoose');

// create model for patient user
var Patient = mongoose.model('Patient', {
    fname: { type: String },
    lname: { type: String },
    address: { type: String },
    phone: { type: String },
    birthday: { type: String },
    sex: { type: String },
    ssn: { type: String },
    allergies: { type: String },
    ec: { type: String },
    ecPhone: { type: String },
    password: { type: String }
}, 'patients');

module.exports = { Patient };