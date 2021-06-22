const express = require('express');
const { check,body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var Utility = require('../utility');
var jwtDecode = require('jwt-decode');
const connection = require('../db_connection');
var aes256 = require('aes256');
const API_KEY = process.env.API_KEY;
const key = process.env.KEY;
function generateId(count) {
    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';

    for(var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return str;
}

router.post('/',[check("jwtToken").notEmpty(),body().custom(body => {
  const keys = ['jwtToken'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
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

    const query = 'SELECT * FROM `verifieduser` WHERE email=?';
    connection.query(query,[decodedValue.tokeBody.email], async function(err, checkCurrentSubscriber) {
      if (!err) {
        if (checkCurrentSubscriber.length>0){
            return res.json('Subscriber already Exists')
        }else{
          //encrypt the password
          const salt = await bcrypt.genSaltSync(10);
          const hashpassword = await bcrypt.hash(decodedValue.tokeBody.password, salt);

          //add new patient
          var patient = decodedValue.tokeBody;
          patient['password'] = hashpassword;
          patient['_id'] = generateId(10);
          patient['Email'] =  patient['email'];
          delete patient['street'];
          delete patient['city'];
          delete patient['state'];
          delete patient['zip'];
          delete patient['country'];
          delete patient['email'];

          var verifieduser = {
              fname: decodedValue.tokeBody.fname,
              lname: decodedValue.tokeBody.lname,
              email: patient['Email'],
          };
          verifieduser['_id'] = generateId(10);
          var val = [];
          var query3= "INSERT INTO `verifieduser` ("
          for(var myKey in verifieduser) {
            query3+=myKey+", ";
            val.push(verifieduser[myKey]);
          }
          query3 = query3.slice(0,query3.length-2);
          query3 += ") VALUES (";
          for(var myKey in verifieduser) {
            query3+="@"+myKey+",";
          }
          query3 = query3.slice(0,query3.length-1);
          query3 += ")";
          connection.query(query3,val, function(err, row) {
            if(!err) {
                console.log('Inserted successfully');
            }else{
              console.log("error");
              console.log(err);
            }
          });

          var query4= "INSERT INTO `patients` (";
          var val = [];
          for(var myKey in patient) {
              query4+=myKey+", ";
              val.push(patient[myKey]);
          }
          query4 = query4.slice(0,query4.length-2);
          query4+= ") VALUES (";
          for(var myKey in patient) {
            query4+="@"+myKey+",";
          }
          query4 = query4.slice(0,query4.length-1);
          query4 += ")";
          connection.query(query4,val, function(err, row) {
            if(!err) {
              res.send(JSON.stringify(patient['_id']));
                console.log('Inserted successfully');
            }else{
              console.log("error1");
              console.log(err);
            }
          });
        }
    }else{
        res.status(500).json({message:"DB Error"});
    }

    });
});

module.exports = router;
