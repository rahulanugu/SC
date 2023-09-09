const express = require("express");
const router = express.Router();
const fs = require("fs");
const nodemailer = require("nodemailer");
var handlebars = require('handlebars');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const connection = require('../services/db');

router.post("/sendMail", (req, res) => {
  console.log('Data to insert => ', req.body);
  let sql =
    "INSERT INTO newUsers (`Id`, `fname`, `lname`, `email`, `usertype`) VALUES (?,?,?,?,?)";
    connection().then((con) => {
      con.query(
        sql,
        [
          req.body.Id,
          req.body.fname,
          req.body.lname,
          req.body.email,
          req.body.typeOfUser,
        ],
        function (err, results) {
          if (err){
            res.status(500).send({err});
            console.log(err);
          }
          else {
            console.log("New users inserted!");
            console.log(results);
            sendVerificationEmail(req.body.email, req.body.fname, req.body.lname);
            res.status(200).send({ message: "Request Access Data Recieved and Send to DB" });
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
  });

//closes connection of query
router.get("/sendAccess", (req, res) => {
  connection().then((con)=> {
      con.query(sql, function (err, results, fields) {
          if (err) throw err;
          console.log("Query Successful");
          console.log(results);
          res.send(results);
        });
      })
      .catch((err) => {});
  });

//email system sender
const sendVerificationEmail = (email, fname, lname) => {
    const output = `
    <p>Request Access Form Submission from ${fname} ${lname} (${email})</p>
    <h3>Request Access Details</h3>
    <ul>
    <li>Name: ${fname} ${lname}</li>
    <li>Email: ${email}</li>
    </ul>
    `;
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
        viewPath: path.resolve('./views'),
        extName: '.handlebars',
      }
    
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "login",
            user:  'moh@scriptchain.co', 
            pass: 'vzktjsyuxosnalps'
        }
    });
    transporter.use('compile', hbs(handlebarOptions));

    // Step 2
    let user = {
      from: '"ScriptChain Health" moh@scriptchain.co',
      to: [{name: fname , address: email}],
      subject: `Thank you, ${fname}, for Requesting Access to ScriptChain Health!`,
      html: 'requestAccessEmail'
    };
      
    let sender = {
      from: '"ScriptChain Health" moh@scriptchain.co',
      to: [{name: "ScriptChain Health", address: "moh@scriptchain.co"}],
      subject: `Request Access Submission`,
      html: output
    };
  
    transporter.sendMail(user, (err, data) => {
      if (err) {
        console.log(err)
        return res.send('Error occurs').status(500);
      }
        return res.send('User Email Confirmation Sent!!!');
    });
    transporter.sendMail(sender, (err, data) => {
      if (err) {
        console.log(err)
        return res.send('Error occurs').status(500);
      }
        return res.send('Request Access Email Notification Sent!!!');
    });
};

module.exports = router;