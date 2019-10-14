const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { Patient } = require('../models/user');
const { Subscriber } = require('../models/subscriber');

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
    const str = req.body;
    
    const checkCurrentSubscriber = await Subscriber.findOne({email: str.tokeBody.email})

    if (checkCurrentSubscriber){
        return res.status(400).send('Subscriber already exists')
    }

    console.log('checkCurrentSubscriber',checkCurrentSubscriber);
    //encrypt the password
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(str.tokeBody.password, salt);

    //add new patient
    const patient = new Patient({
        fname: str.tokeBody.fname,
        lname: str.tokeBody.lname,
        Email: str.tokeBody.email,
        address: str.tokeBody.address,
        phone: str.tokeBody.phone,
        birthday: str.tokeBody.birthday,
        sex: str.tokeBody.sex,
        ssn: str.tokeBody.ssn,
        allergies: str.tokeBody.allergies,
        ec: str.tokeBody.ec,
        ecPhone: str.tokeBody.ecPhone,
        ecRelationship: str.tokeBody.ecRelationship,
        password: hashpassword,
        anemia: str.tokeBody.anemia,
        asthma:str.tokeBody.asthma,
        arthritis: str.tokeBody.arthritis,
        cancer: str.tokeBody.cancer,
        gout: str.tokeBody.gout,
        diabetes: str.tokeBody.diabetes,
        emotionalDisorder: str.tokeBody.emotionalDisorder,
        epilepsy: str.tokeBody.epilepsy,
        fainting: str.tokeBody.fainting,
        gallstones: str.tokeBody.gallstones,
        heartDisease: str.tokeBody.heartDisease,
        heartAttack: str.tokeBody.heartAttack,
        rheumaticFever: str.tokeBody.rheumaticFever,
        highBP: str.tokeBody.highBP,
        digestiveProblems: str.tokeBody.digestiveProblems,
        ulcerative: str.tokeBody.ulcerative,
        ulcerDisease: str.tokeBody.ulcerDisease,
        hepatitis: str.tokeBody.hepatitis,
        kidneyDiseases: str.tokeBody.kidneyDiseases,
        liverDisease: str.tokeBody.liverDisease ,
        sleepApnea: str.tokeBody.sleepApnea,
        papMachine: str.tokeBody.papMachine,
        thyroid: str.tokeBody.thyroid,
        tuberculosis: str.tokeBody.tuberculosis,
        venereal: str.tokeBody.venereal,
        neurologicalDisorders: str.tokeBody.neurologicalDisorders,
        bleedingDisorders: str.tokeBody.bleedingDisorders,
        lungDisease: str.tokeBody.lungDisease,
        emphysema: str.tokeBody.emphysema,
        none: str.tokeBody.none,
        drink: str.tokeBody.drink,
        smoke: str.tokeBody.smoke
    });

    const subscriber= new Subscriber({
        fname: str.tokeBody.fname,
        lname: str.tokeBody.lname,
        email: str.tokeBody.email,
    })

    subscriber.save((err,doc)=>{
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