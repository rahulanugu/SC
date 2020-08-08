const mongoose = require('mongoose');

// create model for saving tokens generated for password reset requests

var ResetPasswordToken = mongoose.model('ResetPasswordToken', {
    token: { type: String },
}, 'resetPasswordTokens');

module.exports = {ResetPasswordToken};