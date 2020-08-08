/**
 * healthCareProvider.js
 * The data model for a healthcare provider
 */
const mongoose = require('mongoose');

// create model for patient user
var DeactivatedHealthcareProvider = mongoose.model('DeactivatedHealthcareProvider', {
    firstName: {type: String},
    lastName: {type: String},
    companyName: { type: String },
    location: { type: String },
    roleInCompany: {type: String},
    email: {type: String},
    password: { type: String },
    phone: {type: String}
}, 'deactivatedHealthcareProviders');

module.exports = { DeactivatedHealthcareProvider };