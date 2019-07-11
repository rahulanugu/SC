const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Patient } = require('../models/user');

// http://localhost:3000/patient/
// get list of all patients
router.get('/', (req, res) => {
    Patient.find((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in retrieving patients: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// get patient using id
router.get('/:id', (req, res) => {
    // check if id is valid
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    else {
        Patient.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.send(doc);
            }
            else {
                console.log('Error in retrieving patient with id: ' + JSON.stringify(err, undefined, 2));
            }
        })
    }
});

// add a patient
router.post('/', (req, res) => {
    var patient = new Patient({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        phone: req.body.phone,
        birthday: req.body.birthday,
        sex: req.body.sex,
        ssn: req.body.ssn,
        allergies: req.body.allergies,
        ec: req.body.ec,
        ecPhone: req.body.ecPhone,
        password: req.body.password,
    });
    patient.save((err, doc) => {
        if (!err) {
            // returns saved patient and 24hex char unique id
            res.send(doc);
        }
        else {
            console.log('Error in saving patient: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;