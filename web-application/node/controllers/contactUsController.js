const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
var {ContactUser} = require('../models/contactUsers');

router.post('/', async (req, res)=>{
    var customer = new ContactUser({
        fname: req.body.FirstName,
        lname: req.body.LastName,
        email:  req.body.Email,
        message: req.body.Message

    });

    customer.save((err, doc)=>{
        if(!err){
            res.status(200).json({
                message:'Your message has been saved'
            });
            mailer(req.body.FirstName, req.body.Email)
        }
        else{
            console.log('error in saving the user who wants to contact');
        }
    });

    function mailer(fname, email){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'badchhapesumod100@gmail.com', 
                pass: 'Sammiyf@0809'
            }
        });
        let mailOptions = {
            from: 'badchhapesumod100@gmail.com', 
            to: email,
            subject: 'Hey it\'s Moh from ScriptChain',
            html:`<!DOCTYPE html>
            <html lang="en">
            <head>
              <title>Bootstrap Example</title>
              <meta charset="utf-8">
            <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto">
            
              <style>
              .panelFooter{
                  font-family: 'Roboto';
                  background-color: #f2f5df;
                  padding-top: 4px;
                  padding-bottom: 4px;
                  border-bottom-left-radius: 15px;
                  border-bottom-right-radius: 15px;
              }
             
                .container1{
                  width: 100%;
                  font-family: 'Roboto';
                  background-color: #00acc1;
                  padding-top: 8px;
                  padding-bottom: 8px;
                  border-top-left-radius: 12px;
                  border-top-right-radius: 12px;
                }
                h2{
                  color: white;
                font-family: 'Roboto', serif;
                }
            h1{
                    
                  font-family: 'Roboto', serif;
            }
                .para{
                  font-family: 'Roboto';
                  margin-left: 16px;
                  margin-right: 16px;
                }
              </style>
            </head>
            <body>
            <div class="container">
              <div class="container1">
                  <h2 align="center">Welcome to ScriptChain</h2>
              </div>
              <h1 align="center">We're thrilled to hear from you!</h1>
              <p class="para">Hi `+fname+`,</p>
              <p class="para">We have received your submission and someone from the ScriptChain team will be in contact with you shortly. Stay tuned.</p>
               <br><br>
             <div class="panelFooter">
                <p align="center" >This message was sent from ScriptChain LLC., Boston, MA</p>
              </div>
            </div>
            </body>
            </html>` 
                };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log('Error occurs');
            }
            return log('Email sent!!!');
        });
    }
});
module.exports = router;