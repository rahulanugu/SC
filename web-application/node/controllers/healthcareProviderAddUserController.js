const express = require("express");
const router = express.Router();
const { dbconnect, sshconnect } = require("../database/database");
const mysql = require("mysql-ssh2");
const connection = require("../services/db");
const bcrypt = require("bcryptjs");
const Crypt = require("cryptr");
const cryptr = new Crypt("key123", "aes-192-gcm");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { sendSMS } = require("../services/sms");

/**
 * Request the creation of a new patient account
 * Input: Body, contains the details that are specified in AddUser_ProviderPortal table
 *       Query, contains the emailChecked and smsChecked
 * Output: 200 - Success status, and the email/sms is sent
 *         500 - Error status
 *         400 - Already exists
 */
router.post("/", (req, res) => {
  // Gets all the data passed by the frontend and encrypt them
  const userType = cryptr.encrypt(req.body.UserType);
  const firstName = cryptr.encrypt(req.body.FirstName);
  const lastName = cryptr.encrypt(req.body.LastName);
  const email = req.body.Email;
  const phone = cryptr.encrypt(req.body.Phone);
  const readmission = req.body.Readmission;
  const readmissionType = cryptr.encrypt(req.body.ReadmissionType);
  const userCondition = req.body.UserCondition;
  const userConditionType = cryptr.encrypt(req.body.UserConditionType);
  const patientInfo = req.body.PatientInfo;
  const medication = req.body.Medication;
  const labs = req.body.Labs;
  const vitals = req.body.Vitals;
  const diagnosis = req.body.Diagnosis;
  const procedures = req.body.Procedures;
  const employer = cryptr.encrypt(req.body.Employer);
  const patientRelation = cryptr.encrypt(req.body.PatientRelation);

  // get emailChecked from ?emailChecked=true
  const emailChecked = req.query.emailChecked;
  const smsChecked = req.query.smsChecked;

  const patientSignUpUrl = "https://scriptchain.co/patients/signup";

  // Query of sql that holds the information passed
  const addUserSql = `Insert into AddUser_ProviderPortal (UserType,FirstName,LastName,Email,Phone,Readmission,UserCondition,PatientInfo,Medication,Labs,Vitals,Diagnosis,Procedures,Employer,PatientRelation,ReadmissionSubType,UserConditionSubType) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  // Use a Promise-based approach instead of 'await'
  connection()
    .then((con) => {
      con.query(
        addUserSql,
        [
          userType,
          firstName,
          lastName,
          email,
          phone,
          readmission,
          userCondition,
          patientInfo,
          medication,
          labs,
          vitals,
          diagnosis,
          procedures,
          employer,
          patientRelation,
          readmissionType,
          userConditionType,
        ],
        function (err, results, fields) {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            if (emailChecked === "true") {
              // send email to the user
              const handlebarOptions = {
                viewEngine: {
                  extName: ".handlebars",
                  partialsDir: path.resolve("./views"),
                  defaultLayout: false,
                },
                viewPath: path.resolve("./views"),
                extName: ".handlebars",
              };
              // Step 1
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  type: "login",
                  user: "moh@scriptchain.co", // TODO: your gmail account
                  pass: "vzktjsyuxosnalps", // TODO: your gmail password
                },
              });
              transporter.use("compile", hbs(handlebarOptions));
              // Step 2
              let user = {
                from: '"ScriptChain Health" moh@scriptchain.co', // TODO: email sender
                to: [{ name: firstName, address: req.body.Email }],
                // TODO: email receiver
                subject: `You've been granted access to ScriptChain Health!`,
                template: "accessGrantedEmail",
                context: {
                  patientSignUpUrl: patientSignUpUrl,
                },
              };
              // Step 3
              transporter.sendMail(user, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  // res.send("User Email Confirmation Sent!!!");
                }
              });
            }

            // Sent text message to the user
            if (smsChecked === "true") {
              sendSMS(
                1 + req.body.Phone.toString(),
                `You've been granted access to ScriptChain Health! Please click the link to finish registering. ${patientSignUpUrl}`,
                "ARN",
                (error, response) => {
                  if (error) {
                    console.error("Unable to send message. " + error);
                  } else {
                    console.log(
                      "\n## Response: ##\n" + JSON.stringify(response)
                    );
                  }
                }
              );
            }

            res.status(200).send({message: "User Added Successfully"});
          }
        }
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

// Commented by Siheng cause it's not used
// async function addUser(req, callback) {
//   // Gets all the data passed by the frontend and encrypt them
//   userType = cryptr.encrypt(req.body.UserType);
//   firstName = cryptr.encrypt(req.body.FirstName);
//   lastName = cryptr.encrypt(req.body.LastName);
//   email = cryptr.encrypt(req.body.Email);
//   phone = cryptr.encrypt(req.body.Phone);
//   readmission = req.body.Readmission;
//   readmissionType = cryptr.encrypt(req.body.ReadmissionType);
//   userCondition = req.body.UserCondition;
//   userConditionType = cryptr.encrypt(req.body.UserConditionType);
//   patientInfo = req.body.PatientInfo;
//   medication = req.body.Medication;
//   labs = req.body.Labs;
//   vitals = req.body.Vitals;
//   diagnosis = req.body.Diagnosis;
//   procedures = req.body.Procedures;
//   employer = cryptr.encrypt(req.body.Employer);
//   patientRelation = cryptr.encrypt(req.body.PatientRelation);

//   // Query of sql that holds the information passed

//   addUserSql = `Insert into AddUser_ProviderPortal (UserType,FirstName,LastName,Email,Phone,Readmission,UserCondition,PatientInfo,Medication,Labs,Vitals,Diagnosis,Procedures,Employer,PatientRelation,ReadmissionSubType,UserConditionSubType) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

//   mysql.connect(sshconnect, dbconnect).then((client) => {
//     client.query(
//       addUserSql,
//       [
//         userType,
//         firstName,
//         lastName,
//         email,
//         phone,
//         readmission,
//         userCondition,
//         patientInfo,
//         medication,
//         labs,
//         vitals,
//         diagnosis,
//         procedures,
//         employer,
//         patientRelation,
//         readmissionType,
//         userConditionType,
//       ],
//       (err, results, fields) => {
//         if (err) {
//           return callback(err, null);
//         } else {
//           return callback(null, results);
//         }
//       }
//     );
//   });
// }
function signedUser(req, callback) {
  UserId = req.body.UserId;
  signedUserSql =
    "Update AddUser_ProviderPortal Set signIn = '1' where UserId = ? ";

  mysql.connect(sshconnect, dbconnect).then((client) => {
    client.query(signedUserSql, [UserId], (err, results, fields) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, results);
      }
    });
  });
}

/**
 * get all patients accounts
 * Output: 200 (OK) - The list of users
 */
router.get("/", (req, res) => {
  const getUserSql = "SELECT * FROM AddUser_ProviderPortal";

  connection()
    .then((con) => {
      con.query(getUserSql, async (err, results) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          const decryptedResults = await Promise.all(
            results.map(async (result) => {
              return {
                UserType: cryptr.decrypt(result.UserType),
                FirstName: cryptr.decrypt(result.FirstName),
                LastName: cryptr.decrypt(result.LastName),
                Email: cryptr.decrypt(result.Email),
                Phone: cryptr.decrypt(result.Phone),
                ReadmissionSubType: cryptr.decrypt(result.ReadmissionSubType),
                UserConditionSubType: cryptr.decrypt(
                  result.UserConditionSubType
                ),
                Employer: cryptr.decrypt(result.Employer),
                PatientRelation: cryptr.decrypt(result.PatientRelation),
              };
            })
          );
          res.send({message: decryptedResults});
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

/**
 * get patients account by email
 * Output: 200 (OK) - User information
 * Written by: Yichen
 */
router.get("/getuser", (req, res) => {
  console.log(req.query.email);
  const getUserSql = "SELECT * FROM AddUser_ProviderPortal WHERE Email = ?";

  connection()
    .then((con) => {
      con.query(getUserSql, [req.query.email],async (err, results) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          const decryptedResults = await Promise.all(
            results.map(async (result) => {
              return {
                UserType: cryptr.decrypt(result.UserType),
                FirstName: cryptr.decrypt(result.FirstName),
                LastName: cryptr.decrypt(result.LastName),
                Email: result.Email,
                Phone: cryptr.decrypt(result.Phone),
                ReadmissionSubType: cryptr.decrypt(result.ReadmissionSubType),
                UserConditionSubType: cryptr.decrypt(
                  result.UserConditionSubType
                ),
                Employer: cryptr.decrypt(result.Employer),
                PatientRelation: cryptr.decrypt(result.PatientRelation),
              };
            })
          );
          res.send({message: decryptedResults});
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});
// Commented by Siheng cause it's not used
// function getUser(req, callback) {
//   // Query of sql that holds the information passed
//   addUserSql = `Select * from AddUser_ProviderPortal`;
//   mysql.connect(sshconnect, dbconnect).then((client) => {
//     client.query(addUserSql, (err, results, fields) => {
//       if (err) {
//         return callback(err, null);
//       } else {
//         for (let i = 0; i < results.length; i++) {
//           results[i].UserType = cryptr.decrypt(results[i].UserType);
//           results[i].FirstName = cryptr.decrypt(results[i].FirstName);
//           results[i].LastName = cryptr.decrypt(results[i].LastName);
//           results[i].Email = cryptr.decrypt(results[i].Email);
//           results[i].Phone = cryptr.decrypt(results[i].Phone);
//           results[i].ReadmissionSubType = cryptr.decrypt(
//             results[i].ReadmissionSubType
//           );
//           results[i].UserConditionSubType = cryptr.decrypt(
//             results[i].UserConditionSubType
//           );
//           results[i].Employer = cryptr.decrypt(results[i].Employer);
//           results[i].PatientRelation = cryptr.decrypt(
//             results[i].PatientRelation
//           );
//         }

//         return callback(null, results);
//       }
//     });
//   });
// }

// module.exports = { addUser, getUser, signedUser };
module.exports = router;
