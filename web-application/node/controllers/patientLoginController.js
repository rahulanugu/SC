const express = require("express");
var router = express.Router();
const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");

const connection = require("../services/db");
const sec_utils = require("../utils/security_utils");
const db_utils = require("../utils/db_utils");
//const {BigQuery} = require('@google-cloud/bigquery');
/*const options = {
  keyFilename: 'serviceAccountKeys/scriptchain-259015-689b82dcb0fe.json',
  projectId: 'scriptchain-259015'

};
const bigquery = new BigQuery(options);*/
//const bigquery = new BigQuery();

// request for patient login ://localhost:3000/patient-login/
/**
 * This method validates the user/patient to log in to the portal.
 * Input: Body, will contain email and the password of the user
 * Output: 200 - Jwt Token and first name
 *         303 - Account deactivated
 *         400 - Bad request
 *         401 - Authorization failed; invalid password, email, API key, or JWT
 *         500 - DB error
 */

router.post(
  "/",
  [
    check("email").notEmpty().isEmail(),
    check("password").notEmpty(),
    body().custom((body) => {
      const keys = ["email", "password"];
      return Object.keys(body).every((key) => keys.includes(key));
    }),
  ],
  async (req, res) => {
    const sql = "SELECT * FROM patientsnew WHERE emailPhone = ?";
    connection()
      .then((con) => {
        con.query(
          sql,
          [req.body.emailAddress],
          async function (err, results, fields) {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Database error" });
            }
            if (results.length === 0) {
              const deactivatedSql =
                "SELECT * FROM deactivatedPatients WHERE email = ?";
              con.query(
                deactivatedSql,
                [req.body.email],
                function (
                  deactivatedErr,
                  deactivatedResults,
                  deactivatedFields
                ) {
                  if (deactivatedErr) {
                    console.log(deactivatedErr);
                    return res.status(500).json({ message: "Database error" });
                  }
                  if (deactivatedResults.length === 0) {
                    return res
                      .status(404)
                      .json({ message: "Invalid Email or password" });
                  } else {
                    return res.status(303).json({
                      message: "The email being handled has been deactivated",
                    });
                  }
                }
              );
            } else {
              const healthcareProvider = results[0];
              const passwordValidate = await sec_utils.passwordIsValid(
                req.body.password,
                healthcareProvider.password
              );
              if (passwordValidate.statusCode != 200) {
                return res
                  .status(passwordValidate.statusCode)
                  .json({ message: passwordValidate.message });
              }
              // Create JWT
              const tokeBody = {
                _id: healthcareProvider._id,
                email: healthcareProvider.emailPhone,
              };
              const token = await sec_utils.EncryptToken(tokeBody, 1800);
              return res.status(200).json({
                idToken: token
              });
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      });
  }
);

/**
 * Verify JWT
 * Input: Body - JWT token
 * Output: 200 - Verification successful
 *         400 - Bad request
 *         401 - Authorization failed; invalid password, email, API key, or JWT
 *         500 - DB error
 */
router.post(
  "/verifytokenintegrity",
  [
    check("jwtToken").notEmpty(),
    body().custom((body) => {
      console.log("Begin verifying token integrity");
      const keys = ["jwtToken"];
      return Object.keys(body).every((key) => keys.includes(key));
    }),
  ],
  async (req, res) => {
    // Validate API request
    // const validate = sec_utils.APIRequestIsValid(req);
    // if (validate.statusCode != 200) {
    //   return res
    //     .status(validate.statusCode)
    //     .json({ message: validate.message });
    // }

    const decryptedRes = await sec_utils.DecryptToken(req.body.jwtToken);
    if (decryptedRes.statusCode != 200) {
      return res
        .status(decryptedRes.statusCode)
        .json({ message: decryptedRes.message });
    }
    return res.status(200).json(decryptedRes.body);
  }
);

module.exports = router;
