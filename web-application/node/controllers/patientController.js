/**
 * patientController.js
 * Uses express to create a RESTful API
 * Defines endpoints that allows application to perform CRUD operations
 */
const nodemailer = require('nodemailer');
const log = console.log;
const express = require('express');
const { check,body,validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const randtoken = require('rand-token');
var Utility = require('../utility');
const {BigQuery} = require('@google-cloud/bigquery');
/*const options = {
    keyFilename: 'serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};*/
const bigquery = new BigQuery();
const API_KEY = "scriptChain@13$67ahi1";
const oauth2Client = new OAuth2(
    "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
    "ZYdS8bspVNCyBrSnxkMxzF2d",
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token:
      "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
  });
const accessToken = oauth2Client.getAccessToken()
// http://localhost:3000/patient/

// get list of all patients
/**
 * Retrieve all the patients from the db
 * Input: N/A
 * Output: All the patientts in the database or error
 *         200 - Succesfully retrieved all the patients in the database
 *         404 - No patients in the database
 */
function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

router.get('/',async (req, res) => {
    //ADD THIS
    if(req.query.API_KEY!=API_KEY){
      return res.status(401).json({Message:'Unauthorized'});
    }
    //ADD THIS
    console.log('you have entered');
    // Authentication to enter this?
    // How to secure this?
    // Need some sort of hack check. How do we check it?
    // Possible type of hacks for an API.

    const query = 'SELECT * FROM `scriptchain-259015.dataset1.patients` WHERE 1=1';
    bigquery.query(query, function(err, doc) {
      if (!err) {
        if(doc){
          res.status(200).json(doc);
        }else{
          res.status(404).send({message: "No patients found"})
        }
      }
      else {
        res.status(500).json({message: "DB Error"});
        console.log('Error in retrieving patients: ' + JSON.stringify(err, undefined, 2));
      }
    });
});


// get patient using id
/**
 * Get the details of a patient finding by Id
 * Input: Id of the patient to search
 * Output: Details of the patient as specified in the patient schema
 *         200 - patient details are found
 *         404 - An error occured/ No patients found
 */
router.get('/:id',[check('id').notEmpty()],(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  if(req.query.API_KEY!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  //validation for id is a side task
  //express validation is a side task
  //usage of headers, how UI handles it?
  //helmet npm package usage?
  const query = 'SELECT * FROM `scriptchain-259015.dataset1.patients` WHERE _id = @id';
  const bigQueryOptions = {
    query: query,
    location: 'US',
    params: {id:req.params.id}
  }
  bigquery.query(bigQueryOptions, function(err, doc) {
    if (!err) {
      if(doc.length==1){
        res.status(200).json(doc[0]);
      }else{
        res.status(404).send({message: "No patient with the provided id found"});
      }
    }else{
      res.status(500).json({message: "DB Error"});
      console.log('Error in retrieving patients: ' + JSON.stringify(err, undefined, 2));
    }
  });
});

/**
 * Check if the subscriber already exists in the database
 * Input: user object
 * Output: message whether the subscriber exists or not
 */
router.post('/:verify',async(req,res)=>{
  console.log(req.query);
  if(req.params.verify!="verify"){
    res.status(400).json({message: "Bad Request"});
  }
   if(req.query.API_KEY!=API_KEY){
     return res.status(401).json({Message:'Unauthorized'});
   }
  const query = 'SELECT * FROM `scriptchain-259015.dataset1.verifieduser` WHERE email = @email';
  const bigQueryOptions = {
    query: query,
    location: 'US',
    params: {email:req.body.user}
  }
  bigquery.query(bigQueryOptions, function(err, checkCurrentSubscriber) {
    if (!err) {
      if (checkCurrentSubscriber.length>0){
        return res.json('Subscriber already exists')
      }else{
          return res.json('Does not exist')
      }
    }else{
      res.status(500).json({message: "DB Error"});
    }
  });
});

/**
 * This metthod will check if the user/patient already exists in the system and sends a verification email if not
 * Input: Body, will contain the JWT token that contains user/patient as defined in the respective schemas
 * Output: 400 - the user already exists
 *         200 - sent the verification mail
 */
/*
,
*/
router.post('/',[check('fname').notEmpty().isAlpha(),
check('lname').notEmpty().isAlpha(),
check('email').isEmail().notEmpty(),
check("street").notEmpty(),
check("city").notEmpty(),
check("state").notEmpty(),
check("zip").notEmpty(),
check("country").notEmpty(),
check("address").notEmpty(),
check('phone').notEmpty(),
check('birthday').notEmpty().isDate(),
check('sex').notEmpty(),
check('ssn').notEmpty(),
check('allergies').notEmpty(),
check('ec').notEmpty(),
check('ecPhone').notEmpty(),
check('ecRelationship').notEmpty().isAlpha(),
check("password").exists().notEmpty(),
check('anemia').isBoolean(),
check("asthma").isBoolean(),
check("arthritis").isBoolean(),
check("cancer").isBoolean(),
check("gout").isBoolean(),
check("diabetes").isBoolean(),
check("emotionalDisorder").isBoolean(),
check("epilepsy").isBoolean(),
check("fainting").isBoolean(),
check("gallstones").isBoolean(),
check("heartDisease").isBoolean(),
check("heartAttack").isBoolean(),
check("rheumaticFever").isBoolean(),
check("highBP").isBoolean(),
check("digestiveProblems").isBoolean(),
check("ulcerative").isBoolean(),
check("ulcerDisease").isBoolean(),
check("hepatitis").isBoolean(),
check("kidneyDiseases").isBoolean(),
check("liverDisease").isBoolean(),
check("sleepApnea").isBoolean(),
check("papMachine").isBoolean(),
check("thyroid").isBoolean(),
check("tuberculosis").isBoolean(),
check("venereal").isBoolean(),
check("neurologicalDisorders").isBoolean(),
check("bleedingDisorders").isBoolean(),
check("lungDisease").isBoolean(),
check("emphysema").isBoolean(),
check("none").isBoolean(),check("drink").notEmpty(),
check("smoke").notEmpty(),
body().custom(body => {
  const keys = ['fname','lname','email','street','city','state','zip','country','address','phone','birthday',
  'sex','ssn','allergies','ec','ecPhone','ecRelationship',"password",'anemia',"asthma","arthritis","cancer",
  "gout","diabetes","emotionalDisorder","epilepsy","fainting","gallstones","heartDisease","heartAttack",
  "rheumaticFever","highBP","digestiveProblems","ulcerative","ulcerDisease","hepatitis","kidneyDiseases",
  "liverDisease","sleepApnea","papMachine","thyroid","tuberculosis","venereal","neurologicalDisorders",
  "bleedingDisorders","lungDisease","emphysema","none","drink","smoke","_id"]
  return Object.keys(body).every(key => keys.includes(key));
})],async(req, res) => {
  const e= validationResult(req);
  console.log(e);
  if(!e.isEmpty()){
    return res.status(400).json({Message:"Bad Request"});
  }
  if(req.query.API_KEY!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
    const tokeBody = req.body;
    // check if email already exist
    //const checkCurrentSubscriber = await VerifiedUser.findOne({email: req.body.email})
    //console.log(req);
    const query1= 'SELECT * FROM `scriptchain-259015.dataset1.verifieduser` WHERE email = @email';
    const bigQueryOptions1 = {
      query: query1,
      location: 'US',
      params: {email:tokeBody.email}
    }
    bigquery.query(bigQueryOptions1, async function(err, checkCurrentSubscriber) {
      if (!err) {
        if (checkCurrentSubscriber.length>0){
          res.json('Subscriber already exists')
        }else{
          //res.json("Does not exist")
          console.log('first pass');
          const query2 = 'SELECT * FROM `scriptchain-259015.dataset1.patients` WHERE Email=@email';
          const bigQueryOptions2 = {
            query: query2,
            location: 'US',
            params: {email:tokeBody.email}
          }
          bigquery.query(bigQueryOptions2, async function(err, checkEmailExist) {
            if (!err) {
              if (checkEmailExist.length>0){
                return res.status(400).send('Email already exists');
              }else{// create JSON Web Token
                // *******make sure to change secret word to something secure and put it in env variable*****
                console.log('second pass');
                const token = await jwt.sign({tokeBody}, "santosh", { expiresIn: 180 });

                // using jwt and token
                res.status(200).json(token)

                var idToken = randtoken.generate(16);

                var tokenSchema = {
                  '_id': generateId(10),
                  'token': idToken,
                  'email': req.body.email
                };

                var query3= "INSERT INTO `scriptchain-259015.dataset1.tokenSchema` VALUES ("
                for(var myKey in tokenSchema) {
                  query3+="@"+myKey+",";

                }
                query3 = query3.slice(0,query3.length-1);
                query3 += ")";
                console.log(query3);
                const bigQueryOptions3 = {
                  query: query3,
                  location: 'US',
                  params: tokenSchema
                }
                bigquery.query(bigQueryOptions3, function(err, row) {
                  if(!err) {
                      console.log('Inserted successfully');
                      // Check the job's status for errors
                      //encrypt the token before sending it
                      var encryptedToken = Utility.EncryptToken(token);
                      console.log('third pass and mail sent');
                      sendVerificationMail(req.body.email,req.body.fname,encryptedToken);
                  }else{
                    console.log("error");
                    console.log(err);
                  }
                });
              }
            }else{
              res.status(500).json({message:'DB Error'});
            }
          });
        }
      }else{
        res.status(500).json({message:'DB Error'});
      }
    });
});
const sendVerificationMail = (email,fname,encryptedToken)=>{

    //create a transporter with OAuth2
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            type: "OAuth2",
            user: "moh@scriptchain.co",
            clientId: "867282827024-auj9ljqodshuhf3lq5n8r79q28b4ovun.apps.googleusercontent.com",
            clientSecret: "zjrK7viSEMoPXsEmVI_R7I6O",
            refreshToken: "1//04OyV2qLPD5iYCgYIARAAGAQSNwF-L9IrfYyKF4kF_HhkGaFjxxnxdgxU6tDbQ1l-BLlOIPtXtCDOSj9IkwiWekXwLCNWn9ruUiE",
            accessToken: accessToken
       }
    });

    //  create mail option with custom template, verification link and Json Web Token
    const mailOptions = {
        from: 'noreply@scriptchain.co',
        to: email,
        subject: 'NO REPLY AT SCRIPTCHAIN.CO! Hey it\'s Moh from ScriptChain',
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
            .container{
                max-width: 280px;
                margin: 0 auto;
                padding: 0;
            }
              @media only screen and (min-width:480px){
                body{
                  margin-left: 20px;
                  margin-right: 20px;
                }
                .container{
                  max-width: 600px;
                }
                .content-body{
                  padding-top: 60px;
                }
                .content-body-text{
                  max-width: 400px;
                  margin: 0 auto;
                }
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
        <p align="center"><a href="http://scriptchain.co/patientlogin?verify=`+encryptedToken+ `?API_KEY=` + API_KEY + `"><button>Verify Your E-mail Address</button></a></p><br><br>
        <p align="center" class="para">If you have any questions or concerns feel free to reach out to <a href="mailto:customer-care@scriptchain.co">customer-care@scriptchain.co</a></p>
          <div class="panelFooter">
            <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
          </div>
        </div>
        </body>
        </html>
        `
    }

    // send email
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            // res.json({err});
            console.log(err);
        }
        transporter.close();
        return log('Email sent!!!');
    });
}

module.exports = router;
