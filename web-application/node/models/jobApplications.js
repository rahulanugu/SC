const mongoose = require('mongoose');

// create model for patient user
var JobApplication = mongoose.model('JobApplication', {
    jobId: {type: String},
    firstName: { type: String },
    lastName: { type: String },
    address: {type: String},
    state: {type: String},
    city: {type: String},
    zipcode: {type: Number},
    email: {type: String},
    contactNumber: {type: Number},
    resume: {type: String}
}, 'jobApplications');

module.exports = {JobApplication};