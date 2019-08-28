/**
 * user.js
 * Contains the database models for each type of user
 */
const mongoose = require('mongoose');

// create model for patient user
var Patient = mongoose.model('Patient', {
    fname: { type: String },
    lname: { type: String },
    Email: {type: String},
    address: { type: String },
    phone: { type: String },
    birthday: { type: String },
    sex: { type: String },
    ssn: { type: String },
    allergies: { type: String },
    ec: { type: String },
    ecPhone: { type: String },
    password: { type: String },
    anemia: { type: Boolean },
    asthma:{ type: Boolean },
    arthritis: { type: Boolean },
    cancer: { type: Boolean },
    gout: { type: Boolean },
    diabetes: { type: Boolean },
    emotionalDisorder: { type: Boolean },
    epilepsy: { type: Boolean },
    fainting: { type: Boolean },
    gallstones: { type: Boolean },
    heartDisease: { type: Boolean },
    heartAttack: { type: Boolean },
    rheumaticFever: { type: Boolean },
    highBP: { type: Boolean },
    digestiveProblems: { type: Boolean },
    ulcerative: { type: Boolean },
    ulcerDisease: { type: Boolean },
    hepatitis: { type: Boolean },
    kidneyDiseases: { type: Boolean },
    liverDisease: { type: Boolean },
    sleepApnea: { type: Boolean },
    papMachine: { type: Boolean },
    thyroid: { type: Boolean },
    tuberculosis: { type: Boolean },
    venereal: { type: Boolean },
    neurologicalDisorders: { type: Boolean },
    bleedingDisorders: { type: Boolean },
    lungDisease: { type: Boolean },
    emphysema: { type: Boolean },
    drink: { type: String },
    smoke: { type: String }
}, 'patients');

module.exports = { Patient };