const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { Patient } = require('../models/user');
const { VerifiedUser } = require('../models/verifiedUser');
var Utility = require('../utility');
var jwtDecode = require('jwt-decode');
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
const { pathToFileURL } = require('url');
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);


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

function generateId(count) {
    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';

    for(var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return str;
}

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

    const query = 'SELECT * FROM `scriptchainprod.ScriptChain.verifieduser` WHERE email=@email';
    const bigQueryOptions={
        query:query,
        location:'US',
        params:{email:decodedValue.tokeBody.email}
    }
    bigquery.query(bigQueryOptions, function(err, checkCurrentSubscriber) {
      if (!err) {
        if (checkCurrentSubscriber.length>0){
            return res.json('Subscriber already Exists')
        }
    }else{
        res.status(500).json({message:"DB Error"});
    }
      
    });


    //encrypt the password
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(decodedValue.tokeBody.password, salt);

    //add new patient
    const patient = decodedValue.tokeBody;
    patient['password'] = hashpassword;
    patient['_id'] = generateId(10);
    patient['Email'] =  new String(patient['email']);
    delete patient['street'];
    delete patient['city'];
    delete patient['state'];
    delete patient['zip'];
    delete patient['country'];
    delete patient['email'];
    
    const verifieduser = {
        _id: generateId(10),
        fname: decodedValue.tokeBody.fname,
        lname: decodedValue.tokeBody.lname,
        email: patient['Email'],
    };

    const filename1 = 'verifieduserTmp.json';
    const datasetId = 'ScriptChain';
    const tableId1 = 'verifieduser';
    fs.writeFileSync(filename1, JSON.stringify(verifieduser));         
    const table1 = bigquery.dataset(datasetId).table(tableId1);
    // Check the job's status for errors
    //const errors = job.status.errors;
    table1.load(filename1,(err1,res1) =>{
    });

    const filename2 = 'patientTmp.json';
    const tableId2 = 'patients';
    fs.writeFileSync(filename2, JSON.stringify(patient));         
    const table2 = bigquery.dataset(datasetId).table(tableId2);
    table2.load(filename2,(err2,res2) =>{
        if (!err2) {
            res.send(JSON.stringify(patient['_id']));
        }
    });

});

module.exports = router;