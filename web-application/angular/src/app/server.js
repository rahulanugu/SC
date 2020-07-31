/**
 * server.js
 * Backend database for the web application
 * (currently unused file)
 */

 /*
 // load environment vairables
 require('dotenv').config();

 // dependencies =======================================================
 const express = require('express'),

//following are the packages required for node js server
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
    config = require('./DB');

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    let port = process.env.PORT || 4000;
    mongoose.Promise = global.Promise;

    // connect to db ===================================================
    mongoose.connect(process.env.DB_URI);

    // schema ========================================================
    var patientSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        password: String,
        dob: String
    })

    // add unique id before saving
    patientSchema.pre('save', function(){
        // code to create uuid
    })

    var patientModel = mongoose.model("Patient", patientSchema);

    // seed database
    seedEvents : (req, res) => {
        // create users
        const users = [
            {firstName:"John", lastName:"Doe", password:"password", dob:"05/30/1999" }
        ];
        // use event model to insert/save
        for (user of users){
            var newUser = new patientModel(user);
            newUser.save();
        }
        // seeded!
        res.send('Database seeded');
    }

    // set up server ==================================================
    const server = app.listen(function(){
        console.log('Listening on port ' + port);
    });

module.exports(seedEvents);*/
