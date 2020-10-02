const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: 'serviceAccountKeys/scriptchain-259015-689b82dcb0fe.json',
    projectId: 'scriptchain-259015'
};
const bigquery = new BigQuery();
var aes256 = require('aes256');
const API_KEY = "scriptChain@13$67ahi1";
const key = "hosenkinosumabeni";

/**
 * The contoller is used to serve the needs of the careers portal of the
 * web application.
 */


/**
 * The method will create a job to the database
 * Input: Body, will contain the job details as specified in the datatype JobOpening
 * Output: Will return the http status and message based on the completeness of save operation to db.
 *         200 - If the job opening is succcesfully saved in the database
 *         500 - If the job couldn't be saved in the database
 */

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}


router.post("/jobposting",[check("title").notEmpty(),check('description').notEmpty(),check("salary").notEmpty(),check("location").notEmpty(),check("email").notEmpty(),check('category').notEmpty(),check('link').notEmpty(),body().custom(body => {
  const keys = ['title','description','salary','location','email','category','link'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
      return res.status(400).json({Message:'Bad Request'})
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if(decrypted!=API_KEY){
      return res.status(401).json({Message:'Unauthorized'});
    }
    console.log("posting a job to the database");
    req.body['_id'] = generateId(10);

    var query= "INSERT INTO `scriptchain-259015.dataset1.jobOpenings` (";
    for(var myKey in req.body) {
      query+=myKey+", ";
    }
    query = query.slice(0,query.length-2);
    query+= ") VALUES (";
    for(var myKey in req.body) {
      query+="@"+myKey+",";
    }
    query = query.slice(0,query.length-1);
    query += ")";
    const bigQueryOptions = {
      query: query,
      params: req.body
    }
    bigquery.query(bigQueryOptions, function(err, row) {
      if(!err) {
          console.log("In careersController[jobposting, POST]: Inserted successfully");
          res.status(200).json({
            message: "Job opening saved in the database"
          });
      }else{
        console.log(err);
        res.status(500).json({
          message: "Cannot save job in the database"
        })
      }
    });

});

/**
 * The method will retrieve all the job openings in the database
 * Input: N/A
 * Output: Will return all the job openings in the database or error message along with
 *         the appropriate http status
 *         200 - Returned along with all the job openings
 *         404 - If there are no jobOpning available in the db.
 */
router.get('/jobposting', (req, res) => {
  if(Object.keys(req.body).length>0){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  const query= 'SELECT * FROM `scriptchain-259015.dataset1.jobOpenings` WHERE 1=1';
  const bigQueryOptions = {
    query: query
  }
  bigquery.query(bigQueryOptions, function(err, row) {
    if(!err) {
        if (row.length>0){
          console.log("In careersController[jobposting]: Rows returned");
          res.status(200).json(row);
        }else{
          console.log("In careersController[jobposting]: Could not retrieve job openings from DB")
          res.status(404).send({message: "Could not retrieve job openings from DB"});
        }
      }
  });
});

/**
 * The method will retrieve all the job openings by category in the database
 * Input: category name
 * Output: Will return all the job openings in the database or error message along with
 *         the appropriate http status
 *         200 - Returned along with all the job openings fron the given category
 *         404 - If there are no jobOpning available in the category the db.
 */
/*
,[check('jobcategory').notEmpty(),body().custom(body => {
  const keys = ['jobcategory'];
  return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Some extra parameters are sent')]
*/
router.get('/jobposting/:jobcategory', (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  const query = 'SELECT * FROM `scriptchain-259015.dataset1.jobOpenings` WHERE category=@category';
  // req.params.jobcategory+'"';
  const bigQueryOptions = {
    query: query,
    params: {category:req.params.jobcategory}
  }
  bigquery.query(bigQueryOptions, function(err, rows) {
    if(!err) {
      if(rows.length>0)
        res.status(200).json(rows);
    else
      res.status(404).send({message: "Could not retrieve job openings from DB"});
      // next();
    }
    else{
      res.status(500).send({message: "Server Error"});
      console.log(err);
    }
  });
});


/**
 * The method will create a job category to the database
 * Input: Body, will contain the job category details as specified in the datatype JobCategory
 * Output: Will return the http status and message based on the completeness of save operation to db.
 *         200 - If the job category is succcesfully saved in the database
 *         500 - If the job couldn't be saved in the database
 */

router.post("/jobcategory",[check("title").notEmpty(),check('description').notEmpty(),body().custom(body => {
  const keys = ['title','description'];
  return Object.keys(body).every(key => keys.includes(key));
})],async(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
      return res.status(400).json({Message:'Bad Request'})
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if(decrypted!=API_KEY){
      return res.status(401).json({Message:'Unauthorized'});
    }

  console.log("posting a jobcategory to the database");
  req.body['_id'] = generateId(10);
  console.log(req.body);

  var query= "INSERT INTO `scriptchain-259015.dataset1.jobCategories` ("
  for(var myKey in req.body) {
    query+=myKey+", ";
  }
  query = query.slice(0,query.length-2);
  query+= ") VALUES (";
  for(var myKey in req.body) {
    query+="@"+myKey+",";
  }
  query = query.slice(0,query.length-1);
  query += ")";
  console.log(query);
  const bigQueryOptions = {
    query: query,
    params: req.body
  }
  bigquery.query(bigQueryOptions, function(err, row) {
    if(!err) {
        console.log("In careersController[jobcategory, POST]: Inserted successfully");
        res.status(200).json({
          message: "Job category saved in the database"
        });
    }else{
      console.log(err);
      res.status(500).json({
        message: "An error has occured trying to save the job category in the database"
      })
    }
  });
});

/**
 * The method will retrieve all the job categoried in the database
 * Input: N/A
 * Output: Will return all the job openings in the database or error message along with
 *         the appropriate http status
 *         200 - Returned along with all the job categories
 *         404 - If there are no jobCategory available in the db.
 */
router.get('/jobcategory', (req, res) => {
  if(Object.keys(req.body).length>0){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
  const query = 'SELECT * FROM `scriptchain-259015.dataset1.jobCategories` WHERE 1=1';
  bigquery.query(query, function(err, rows) {
    if(!err) {
      res.status(200).json(rows);
    }else{
      res.status(404).send({message: "Could not retrieve job openings from DB"});
      next();
    }
  });
});



// get job details using id
/**
 * The method will retrieve the details of a particular jobposting searched by id
 * Input: Job Id
 * Output: Will return the details of the job if found or else will return an error status
 *         200 - If the job is found
 *         404 - If the job with the given Id is not found
 */
router.get('/jobposting/job/:jobid',(req, res) => {
  console.log(req.params);
  if(Object.keys(req.body).length>0){
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }
    const query = 'SELECT * FROM `scriptchain-259015.dataset1.jobOpenings` WHERE _id=@id';
  // req.params.jobid+'"';
  console.log(req.params);
    const bigQueryOptions = {
      query: query,
      params: {id:req.params.jobid}
     }
    bigquery.query(bigQueryOptions, function(err, rows) {
      if(!err) {
        if(rows.length>0)
          res.status(200).json(rows[0]);
        else
          res.status(404).send({message: "Job ID doesn't exist"});
        //next();
      }
      else{
        res.status(500).send({message: "Server Error"});
        console.log(err);
      }
    });
});

module.exports = router;
