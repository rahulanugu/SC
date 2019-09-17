/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations  
 */
const nodemailer = require('nodemailer');
const log = console.log;
const express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

var ObjectId = require('mongoose').Types.ObjectId;
const hbs = require('nodemailer-express-handlebars');

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
router.post('/',async (req, res) => {
    
    //already exist
    const emailExist = await Patient.findOne({Email: req.body.email});
    if(emailExist) {
        return res.status(400).send('Email already exists');
    }


    // //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    

    var patient = new Patient({
        fname: req.body.fname,
        lname: req.body.lname,
        Email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        birthday: req.body.birthday,
        sex: req.body.sex,
        ssn: req.body.ssn,
        allergies: req.body.allergies,
        ec: req.body.ec,
        ecPhone: req.body.ecPhone,
        password: hashpassword,
        anemia: req.body.anemia,
        asthma:req.body.asthma,
        arthritis: req.body.arthritis,
        cancer: req.body.cancer,
        gout: req.body.gout,
        diabetes: req.body.diabetes,
        emotionalDisorder: req.body.emotionalDisorder,
        epilepsy: req.body.epilepsy,
        fainting: req.body.fainting,
        gallstones: req.body.gallstones,
        heartDisease: req.body.heartDisease,
        heartAttack: req.body.heartAttack,
        rheumaticFever: req.body.rheumaticFever,
        highBP: req.body.highBP,
        digestiveProblems: req.body.digestiveProblems,
        ulcerative: req.body.ulcerative,
        ulcerDisease: req.body.ulcerDisease,
        hepatitis: req.body.hepatitis,
        kidneyDiseases: req.body.kidneyDiseases,
        liverDisease: req.body.liverDisease ,
        sleepApnea: req.body.sleepApnea,
        papMachine: req.body.papMachine,
        thyroid: req.body.thyroid,
        tuberculosis: req.body.tuberculosis,
        venereal: req.body.venereal,
        neurologicalDisorders: req.body.neurologicalDisorders,
        bleedingDisorders: req.body.bleedingDisorders,
        lungDisease: req.body.lungDisease,
        emphysema: req.body.emphysema,
        drink: req.body.drink,
        smoke: req.body.smoke
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
    
    //send email
    mailer(req.body.email,req.body.fname);

});
function mailer(email,fname){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'badchhapesumod100@gmail.com', 
            pass: 'Sammiyf@0809'
        }
    });
    // transporter.use('compile',hbs({
    //     viewEngine: {
    //         extName: '.hbs',
    //         partialsDir: 'some/path',
    //         layoutsDir: 'some/path',
    //         defaultLayout: 'email.body.hbs'
    //     },
    //     viewPath:'../views/'
    // }));
    let mailOptions = {
        from: 'badchhapesumod100@gmail.com', 
        to: email,
        subject: 'Hey it\'s Moh from ScriptChain',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Bootstrap Example</title>
          <meta charset="utf-8">
        
          <style>
          .panelFooter{
              font-family: Arial;
              background-color: #f2f5df;
              padding-top: 4px;
              padding-bottom: 4px;
              border-bottom-left-radius: 15px;
              border-bottom-right-radius: 15px;
          }
          .container{
          }
            .container1{
              width: 100%;
              font-family: arial;
              background-color: #6638e2;
              padding-top: 8px;
              padding-bottom: 8px;
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            }
            h2{
              color: white;
            }
            .para{
              font-family: Arial;
              margin-left: 16px;
              margin-right: 16px;
            }
            button{
              background-color: #6638e2; /* Green */
              border: none;
              width: 400px;
              border-radius: 10px;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 17px;
            }
          </style>
        </head>
        <body>
        <div class="container">
          <div class="container1">
              <h2 align="center">Welcome to ScriptChain</h2>
          </div>
          <h1 align="center"style="font-family: arial;">YOU'RE ALMOST DONE REGISTERING!</h1>
          <p class="para">Hi `+fname+`,</p>
          <p class="para">Welcome to ScriptChain! We are glad that you have registered, there is just one more step to verify your account. <b>Please click the link below to verify your email address.</b></p>
        <p align="center"><button>Verify Your E-mail Address</button></p><br><br>
        <p align="center" class="para">If you have any questions or concerns feel free to reach out to <a href="mailto:Moh@scriptchain.co">Moh@scriptchain.co</a></p>
          <div class="panelFooter">
            <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
          </div>
        </div>
        </body>
        </html>        
        `
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        return log('Email sent!!!');
    });
}
module.exports = router;