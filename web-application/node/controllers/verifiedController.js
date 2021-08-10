const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');

const sec_utils = require('../utils/security_utils');
const db_utils = require('../utils/db_utils');

function generateId(count) {
    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';

    for(var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return str;
}

router.post('/',[
  check("jwtToken").notEmpty(),
  body().custom(body => {
    const keys = ['jwtToken'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }

    const decryptedRes = await sec_utils.DecryptToken(req.body.jwtToken);
    if (decryptedRes.statusCode != 200) {
      return res.status(decryptedRes.statusCode).json({message: decryptedRes.message});
    }
    console.log("Creating an actual user after verification in the database");

    const user = decryptedRes.body;
    // Check for user in verifieduser table in db
    const userExists = await db_utils.checkForUserInDB('verifieduser', user.email);
    if (userExists) {
      return res.status(400).json({message: 'Subscriber already Exists'});
    }
      
    const verifieduser = {
      _id: generateId(10),
      fname: user['fname'],
      lname: user['lname'],
      email: user['email'],
    };
    // Add user to verifieduser table in db
    const resp = await db_utils.insertUserIntoDB('verifieduser', verifieduser);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(verifieduser)

    // Old code, not sure why they wanted a new patient created here - JDW
    /*
    //encrypt the password
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hash(patient['password'], salt);

    //add new patient
    patient['password'] = hashpassword;
    patient['_id'] = generateId(10);
    patient['Email'] =  patient['email'];
    delete patient['street'];
    delete patient['city'];
    delete patient['state'];
    delete patient['zip'];
    delete patient['country'];
    delete patient['email'];

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
    db_utils.connection.query(query4, val, (err, row) => {
      if(!err) {
        res.send(JSON.stringify(patient['_id']));
          console.log('Inserted successfully');
      }else{
        console.log("error1");
        console.log(err);
      }
    });

    <- Refactor example: lines 77-98 ->
    
    // Add patient to db
    const resp = await db_utils.insertUserIntoDB('patients', patient);
    let body = resp.body;
    body['message'] = resp.message;
    return res.status(resp.statusCode).json(body);

    */
});

module.exports = router;
