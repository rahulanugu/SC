const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { Patient } = require('../models/user');
const { VerifiedUser } = require('../models/verifiedUser');
var Utility = require('../utility');
var jwtDecode = require('jwt-decode');



// using jwt and token
// const passportJWT = require('passport-jwt');
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;
// const passport = require('passport');

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'santosh'

// };
  
// const strategy = new JwtStrategy(opts, (payload, next) => {
//     // User.forge({ id: payload.id }).fetch().then(res => {
//     //   next(null, res);
//     // });
// });

// passport.use(strategy);

// router.use(passport.initialize());

// router.post('/', passport.authenticate('jwt', { session: false }),
//     function(req, res) {
//         //res.send(req.user.profile);
//         console.log(res)
//     }
// );

router.post('/',async(req, res) => {

    console.log("Creating an actual user after verification in the database");
    
    //the body consists of an encrypted jwt token
    //console.log("req bdy is "+req.body.jwtToken)
    
    //the incoming strings are improperly formatted with '+' being replaced with spaces

    //correcting the format by replacing spaces with '+'
    var encryptedToken = req.body.jwtToken.replace(/ /g, '+');

    //decrypting the token
    const decryptedToken = Utility.DecryptToken(encryptedToken);

    //decoding the token
    var decodedValue = jwtDecode(decryptedToken);

    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.verifieduser` WHERE email='+'"'+
    decodedValue.tokeBody.email+'"';
    bigquery.query(query, function(err, checkCurrentSubscriber) {
      if (!err) {
        if (checkCurrentSubscriber){
            return res.status(400).send('Subscriber already exists')
        }
      }
    });


    console.log('checkCurrentSubscriber',checkCurrentSubscriber);
    //encrypt the password
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(decodedValue.tokeBody.password, salt);

    //add new patient
    const patient = decodedValue.tokeBody;
    patient['password'] = hashpassword;

    const verifieduser = {
        fname: decodedValue.tokeBody.fname,
        lname: decodedValue.tokeBody.lname,
        email: decodedValue.tokeBody.email,
    };

    bigquery.query(query1, function(err, row1) {
        const filename = 'verifieduserTmp.json';
        const datasetId = 'ScriptChain';
        const tableId = 'verifieduser';
        fs.writeFileSync(filename, JSON.stringify(verifieduser));         
        const table = bigquery.dataset(datasetId).table(tableId);
        // Check the job's status for errors
        //const errors = job.status.errors;
        table.load(filename,(err,res) =>{
            if(err){
                console.log(err)
            }
        });
    });

    bigquery.query(query2, function(err, row1) {
        const filename = 'patientTmp.json';
        const datasetId = 'ScriptChain';
        const tableId = 'patients';
        fs.writeFileSync(filename, JSON.stringify(patient));         
        const table = bigquery.dataset(datasetId).table(tableId);
        table.load(filename,(err,res) =>{
            if (!err) {
                // returns saved patient and 24hex char unique id  
                res.send(res);
            }
            else {
                console.log('Error in saving patient: ' + JSON.stringify(err, undefined, 2));
            }
        });
    });
});

module.exports = router;