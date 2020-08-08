const mongoose = require('mongoose');

// create model for patient user
var JobOpening = mongoose.model('JobOpening', {
    title: { type: String },
    description: { type: String },
    salary: {type: String},
    location: { type: String },
    email: {type: String},
    category: {type:String}
}, 'jobOpenings');

module.exports = {JobOpening};