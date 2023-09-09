//Charan Jagwani: created backend service for form as well as email system sender
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const connection = require('../services/db');


router.post("/sendMail", (req, res) => {
  let sql =
    "INSERT INTO contactUsers (`fname`, `lname`, `email`, `company`,`message`) VALUES (?,?,?,?,?)";
    connection().then((con)=> {
      con.query(
        sql,
        [
          req.body.fname,
          req.body.lname,
          req.body.email,
          req.body.company,
          req.body.message,
        ],
        function (err, results, fields) {
          if (err) throw err;
          else {
            console.log("Query Successful");
            console.log(results);
            sendEmail(req)
            res.status(200).send({ message: "Data Recieved and Send to DB" });
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
  });

router.post("/homecontact", (req, res) => {
  console.log("name", req.body.name);
  console.log("email", req.body.email);
  console.log("subject", req.body.subject);
  console.log("message", req.body.message);

  let sql =
    "INSERT INTO contactUsers (`fname`, `lname`, `email`,`message`) VALUES (?,?,?,?)";
    connection().then((con)=> {
      con.query(
        sql,
        [
          req.body.name,
          req.body.subject,
          req.body.email,
          req.body.message,
        ],
        function (err, results, fields) {
          if (err) throw err;
          else {
            console.log("Query Successful");
            console.log(results);
            res.status(200).send({ message: "Data Recieved and Send to DB" });
          }
        }
      );
    }).catch((err) => {
        console.log(err);
      });
  });

//email system sender for contact form response
const sendEmail = (req) => {
  let data = req.body;
  const output = `
  <p>We have received your message via our Contact Form.
  Someone from our team will be in touch soon.</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${data.fname} ${data.lname}</li>
  <li>Email: ${data.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${data.message}</p>
  `;
  const output1 = `
  <p>Contact Form Submission from ${data.fname} ${data.lname} ( ${data.email})</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${data.fname} ${data.lname}</li>
  <li>Email: ${data.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${data.message}</p>
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
      user: 'moh@scriptchain.co', 
      pass: 'vzktjsyuxosnalps'
    }
  });
    transporter.use('compile', hbs(handlebarOptions));

  // Step 2
  let user = {
      from: '"ScriptChain Health" moh@scriptchain.co',
      to: [{name: data.fname , address: data.email}],
      subject: `Thank You for Contacting ScriptChain Health!`,
      template: 'contactUsEmail'
    };
  
  let sender = {
    from: '"ScriptChain Health" moh@scriptchain.co',
    to: [{name: "ScriptChain Health", address: "moh@scriptchain.co"}],
    subject: `Contact Form Submission`,
    html: output1
  };
  
  // Step 3
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
    return res.send('Contact Form Email Notification Sent!!!');
    });
  }

  module.exports = router;