//Charan Jagwani: wrote controller
const express = require("express");
const router = express.Router();
const connection = require('../services/db');
//getting info from advisor table
router.get("/advisoraccess", (req, res) => {
  let sql = "SELECT * FROM AdvisorInfo";
  connection().then((con) => {
   con.query(sql, function (err, results, fields) {
       if(err) {
           res.status(500).send({ err });
       } else {
           res.send(results);
       }
     }) 
  }).catch((err) => {
   res.status(500).send({ err });
  });
});

//finds id from advisor needed
router.get("/getAdvisor/:Id", (req, res) => {
  let sql = `SELECT Id, fname, lname, occupation, education, briefinfo, description, image FROM scriptchain.AdvisorInfo WHERE Id = ${req.params.Id}`;
 connection().then((con)=> {
   con.query(sql, [req.params.Id], function (err, results, fields) {
       if (err) {
         res.status(500).send({ err });
         console.log(err);
       } else {
         console.log("Get Advisor 1 Successful");
         console.log(results);
         res.status(200).send(results);
       }
 })
}).catch((err)=> {
   res.status(500).send({ err });
})
});

        module.exports = router;