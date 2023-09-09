//Charan Jagwani: created backend service to find data from sql table as well as dynamic backend service
const express = require("express");
const router = express.Router();
const connection = require('../services/db');


//sql query for selecitng data from employ info table
router.get("/dbaccess", (req, res) => {
  let sql =
    "SELECT * FROM EmployInfo";
    connection().then((con) => {
        con.query(sql,function (err, results, fields) {
            if (err){
                console.log("got error")
                res.status(500).send({err});
                console.log(err);
              } else {
                console.log("Employee Successful");
          console.log(results);
          res.send(results);
              }
        }
      );
    }) 
});
//sql query for selecting data from advisor info table
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

 //data selected from their specific id found here
router.get("/getEmployee/:Id", (req, res) => {
  let sql = `SELECT Id, fname, lname, occupation, education, briefinfo, description, image FROM scriptchain.EmployInfo WHERE Id = ${req.params.Id}`;
  connection().then((con)=> {
    con.query(sql, [req.params.Id], function (err, results, fields) {
        if (err) {
          res.status(500).send({ err });
          console.log(err);
        } else {
          console.log("Get Employee 1 Successful");
          console.log(results);
          res.status(200).send(results);
        }
  })
}).catch((err)=> {
    res.status(500).send({ err });
});
});
 //data selected from their specific id found here
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

module.exports = router;