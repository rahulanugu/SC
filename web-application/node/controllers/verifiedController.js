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

    const checkCurrentSubscriber = await VerifiedUser.findOne({email: decodedValue.tokeBody.email})

    if (checkCurrentSubscriber){
        return res.status(400).send('Subscriber already exists')
    }

    console.log('checkCurrentSubscriber',checkCurrentSubscriber);
    //encrypt the password
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(decodedValue.tokeBody.password, salt);

    //add new patient
    const patient = new Patient({
        fname: decodedValue.tokeBody.fname,
        lname: decodedValue.tokeBody.lname,
        Email: decodedValue.tokeBody.email,
        address: decodedValue.tokeBody.address,
        phone: decodedValue.tokeBody.phone,
        birthday: decodedValue.tokeBody.birthday,
        sex: decodedValue.tokeBody.sex,
        ssn: decodedValue.tokeBody.ssn,
        allergies: decodedValue.tokeBody.allergies,
        ec: decodedValue.tokeBody.ec,
        ecPhone: decodedValue.tokeBody.ecPhone,
        ecRelationship: decodedValue.tokeBody.ecRelationship,
        password: hashpassword,
        anemia: decodedValue.tokeBody.anemia,
        asthma:decodedValue.tokeBody.asthma,
        arthritis: decodedValue.tokeBody.arthritis,
        cancer: decodedValue.tokeBody.cancer,
        gout: decodedValue.tokeBody.gout,
        diabetes: decodedValue.tokeBody.diabetes,
        emotionalDisorder: decodedValue.tokeBody.emotionalDisorder,
        epilepsy: decodedValue.tokeBody.epilepsy,
        fainting: decodedValue.tokeBody.fainting,
        gallstones: decodedValue.tokeBody.gallstones,
        heartDisease: decodedValue.tokeBody.heartDisease,
        heartAttack: decodedValue.tokeBody.heartAttack,
        rheumaticFever: decodedValue.tokeBody.rheumaticFever,
        highBP: decodedValue.tokeBody.highBP,
        digestiveProblems: decodedValue.tokeBody.digestiveProblems,
        ulcerative: decodedValue.tokeBody.ulcerative,
        ulcerDisease: decodedValue.tokeBody.ulcerDisease,
        hepatitis: decodedValue.tokeBody.hepatitis,
        kidneyDiseases: decodedValue.tokeBody.kidneyDiseases,
        liverDisease: decodedValue.tokeBody.liverDisease ,
        sleepApnea: decodedValue.tokeBody.sleepApnea,
        papMachine: decodedValue.tokeBody.papMachine,
        thyroid: decodedValue.tokeBody.thyroid,
        tuberculosis: decodedValue.tokeBody.tuberculosis,
        venereal: decodedValue.tokeBody.venereal,
        neurologicalDisorders: decodedValue.tokeBody.neurologicalDisorders,
        bleedingDisorders: decodedValue.tokeBody.bleedingDisorders,
        lungDisease: decodedValue.tokeBody.lungDisease,
        emphysema: decodedValue.tokeBody.emphysema,
        none: decodedValue.tokeBody.none,
        drink: decodedValue.tokeBody.drink,
        smoke: decodedValue.tokeBody.smoke
    });

    const verifieduser= new VerifiedUser({
        fname: decodedValue.tokeBody.fname,
        lname: decodedValue.tokeBody.lname,
        email: decodedValue.tokeBody.email,
    })

    verifieduser.save((err,doc)=>{
        if(err){
            console.log(err)
        }
        // if(!err){
        //     res.send(doc);
        // }else{
        //     console.log('Error in saving subscriber: ' + JSON.stringify(err, undefined, 2));
        // }
    })

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