const express = require('express');
const router = express.Router();

var { NewRequestAccessUser } = require('../models/newRequestAccessUser')

router.post('/', async (req, res)=>{
    const emailExist = await NewRequestAccessUser.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).json({
            message:'Email is already registered'
        });
    }
    
    var newrequestaccessuser = new NewRequestAccessUser({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        typeOfUser: req.body.typeOfUser
    });
    newrequestaccessuser.save((err, doc)=>{
        
        if(!err){
            res.send(doc);
        }
        else{
            console.log('error in saving requested access user');
        }
    });
});

module.exports = router;