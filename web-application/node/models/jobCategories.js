const mongoose = require('mongoose');

// create model for patient user
var JobCategory = mongoose.model('JobCategory', {
    title: { type: String },
    description: { type: String }
}, 'jobCategories');

module.exports = {JobCategory};

//post
//get
//put: TODO
//delete: TODO