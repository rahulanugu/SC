const express = require("express");
const router = express.Router();
const { Patient } = require('../models/user');
const { DeactivatedPatient } = require('../models/deactivatedUser');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var jwtDecode = require('jwt-decode');



router.post("/patient/request", async (req, res) => {
    //find the patient
    console.log("Reactivating patient is being requested")
    const patient = await DeactivatedPatient.findOne({Email : req.body.email});

    if(!patient){
        return res.status(404).json({
        message: "Email not among deactivated users"
        });
    }
    //generate a jwt token with email,name
    const token = jwt.sign({_id:patient._id,fname:patient.fname,email:patient.Email}, 'santosh', { expiresIn: 500 });

    sendVerificationMail(req.body.email,patient.fname,token);

    return res.status(200).json(
        {
            "message": "Email Sent"
        }
    );
    //email the token
});


/**
 * Method to save the customer query to the database
 * Input: Details of ContactUser as specified in schema
 * Output: Status of the save operation
 *         200 - Successfylly saved the request
 *         500 - An error occured trying to save the request
 */
router.post("/patient/activate", async (req, res) => {
    //check validity of token

   const verification = await jwt.verify(req.body.token, 'santosh', (err, data) => {
      if(err) {
        console.log("Token verification failed")
        return false;
      }
        console.log("Token succesfully verified")
        return true;
        //tokebody of decodedvalue will contain the value of json objet
    })
  
    if(!verification){
      return res.status(500).json({
        "message": "Jwt token verification failed"
      });
    }

    var decodedValue = jwtDecode(req.body.token);

    console.log(decodedValue)

    const retrievedPatient = await DeactivatedPatient.findOne({Email: decodedValue.email})

    
    if (retrievedPatient){
        //return res.status(200).send('Email has to be deactivated')
    
        const patient = new Patient({
            fname: retrievedPatient.fname,
            lname: retrievedPatient.lname,
            Email: retrievedPatient.Email,
            address: retrievedPatient.address,
            phone: retrievedPatient.phone,
            birthday: retrievedPatient.birthday,
            sex: retrievedPatient.sex,
            ssn: retrievedPatient.ssn,
            allergies: retrievedPatient.allergies,
            ec: retrievedPatient.ec,
            ecPhone: retrievedPatient.ecPhone,
            ecRelationship: retrievedPatient.ecRelationship,
            password: retrievedPatient.password,
            anemia: retrievedPatient.anemia,
            asthma:retrievedPatient.asthma,
            arthritis: retrievedPatient.arthritis,
            cancer: retrievedPatient.cancer,
            gout: retrievedPatient.gout,
            diabetes: retrievedPatient.diabetes,
            emotionalDisorder: retrievedPatient.emotionalDisorder,
            epilepsy: retrievedPatient.epilepsy,
            fainting: retrievedPatient.fainting,
            gallstones: retrievedPatient.gallstones,
            heartDisease: retrievedPatient.heartDisease,
            heartAttack: retrievedPatient.heartAttack,
            rheumaticFever: retrievedPatient.rheumaticFever,
            highBP: retrievedPatient.highBP,
            digestiveProblems: retrievedPatient.digestiveProblems,
            ulcerative: retrievedPatient.ulcerative,
            ulcerDisease: retrievedPatient.ulcerDisease,
            hepatitis: retrievedPatient.hepatitis,
            kidneyDiseases: retrievedPatient.kidneyDiseases,
            liverDisease: retrievedPatient.liverDisease ,
            sleepApnea: retrievedPatient.sleepApnea,
            papMachine: retrievedPatient.papMachine,
            thyroid: retrievedPatient.thyroid,
            tuberculosis: retrievedPatient.tuberculosis,
            venereal: retrievedPatient.venereal,
            neurologicalDisorders: retrievedPatient.neurologicalDisorders,
            bleedingDisorders: retrievedPatient.bleedingDisorders,
            lungDisease: retrievedPatient.lungDisease,
            emphysema: retrievedPatient.emphysema,
            none: retrievedPatient.none,
            drink: retrievedPatient.drink,
            smoke: retrievedPatient.smoke
        });

        patient.save(async(err, doc) => {
            if (!err) {
                // returns saved patient and 24hex char unique id
                console.log("The deactivated patient entry has been moved to patient")
                const deleteStatus = await DeactivatedPatient.deleteOne({Email: decodedValue.email})
    
                if(deleteStatus.n != 1){
                    console.log("An error has occured while trying to delete the patient entry from the patient database")
                    res.status(500).json({"message": "account could not be deactivated due to an error"});
        
                }
              return res.status(200).json({"message":"account has been reactivated"});
            }
            else {
                console.log("Error occured trying to save deactivated patient in the database"+err);
                res.status(500).json({"message": "account could not be deactivated due to an error"});
                console.log('Error in saving patient: ' + JSON.stringify(err, undefined, 2));
            }
        });
    } else {
        console.log("Email is not found.")
        res.status(404).json({"messsage": "A deactivated account could not be found with the email provided"})
    }


});

const oauth2Client = new OAuth2(
    "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
    "ZYdS8bspVNCyBrSnxkMxzF2d",
    "https://developers.google.com/oauthplayground"
);

const accessToken = oauth2Client.getAccessToken();

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
        subject: 'NO REPLY AT SCRIPTCHAIN.COM!!! We have recieved a request to reset password.',
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
          <h1 align="center"style="font-family: arial;">We have recieved a request to Reactivate your account.</h1>
          <p class="para">Hi `+fname+`,</p>
        <p align="center"><a href="http://scriptchain.co/reactivatepatient?token=`+encryptedToken+`"><button>Click here to reactivate</button></a></p><br><br>
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
