const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
var aes256 = require('aes256');
const { compareSync } = require("bcryptjs");

const db_utils = require('../db_utils');

const API_KEY = process.env.API_KEY;
const key = process.env.KEY;

function generateId(count) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';
  
  for(var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

/**
 * The method will create a job to the database
 * Input: Body, will contain the job details as specified in the datatype JobOpening
 * Output: Will return the http status and message based on the completeness of save operation to db.
 *         200 - If the job opening is succcesfully saved in the database
 *         500 - If the job couldn't be saved in the database
 */
router.post("/jobposting", [
  check("title").notEmpty(),
  check('description').notEmpty(),
  check("salary").notEmpty(),
  check("location").notEmpty(),
  check("email").notEmpty(),
  check('category').notEmpty(),
  check('link').notEmpty(),
  body().custom(body => {
    const keys = ['title','description','salary','location','email','category','link'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err);
      console.log('link is ', req.body.link);
      return res.status(400).json({Message:'Bad Request'})
    }
    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    const jobOpening = req.body;
    console.log("posting a job to the database");
    jobOpening['_id'] = generateId(10);

    db_utils.insertUserIntoDB('jobOpenings', jobOpening).then(resp => {
      let body = resp.body;
      body['message'] = resp.message;
      return res.status(resp.statusCode).json(body);
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
router.get('/jobposting', async (req, res) => {
  if (Object.keys(req.body).length > 0) {
    return res.status(400).json({Message:'Bad Request'})
  }
  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  //console.log(decrypted);
  if (decrypted != API_KEY) {
    return res.status(401).json({Message:'Unauthorized'});
  }

  db_utils.getAllRowsFromTable('jobOpenings').then(resp => {
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(resp.statusCode).json(resp.body);
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
router.get('/jobposting/:jobcategory', async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Message:'Bad Request'})
  }

  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }

  db_utils.getRowFromTableWhere('jobOpenings', {'category': req.params.jobcategory}).then(resp => {
    let body = resp.body;
    body['message'] = resp.message;
    return res.status(resp.statusCode).json(body);
  });
});


/**
 * The method will create a job category to the database
 * Input: Body, will contain the job category details as specified in the datatype JobCategory
 * Output: Will return the http status and message based on the completeness of save operation to db.
 *         200 - If the job category is succcesfully saved in the database
 *         500 - If the job couldn't be saved in the database
 */

router.post("/jobcategory", [
  check("title").notEmpty(),
  check('description').notEmpty(),
  body().custom(body => {
    const keys = ['title','description'];
    return Object.keys(body).every(key => keys.includes(key));
  })],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({Message:'Bad Request'})
    }

    var decrypted = aes256.decrypt(key, req.query.API_KEY);
    console.log(decrypted);
    if (decrypted != API_KEY) {
      return res.status(401).json({Message:'Unauthorized'});
    }

    const jobOpening = req.body;

    console.log("posting a jobcategory to the database");
    jobOpening['_id'] = generateId(10);
    console.log(jobOpening);

    db_utils.insertUserIntoDB('jobCategories', jobOpening).then(resp => {
      let body = resp.body;
      body['message'] = resp.message;
      return res.status(resp.statusCode).json(body);
    });
});

/**
 * The method will retrieve all the job categories in the database
 * Input: N/A
 * Output: Will return all the job openings in the database or error message along with
 *         the appropriate http status
 *         200 - Returned along with all the job categories
 *         404 - If there are no jobCategory available in the db.
 */
router.get('/jobcategory', async (req, res) => {
  if(Object.keys(req.body).length>0){
    return res.status(400).json({Message:'Bad Request'})
  }

  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if( decrypted != API_KEY) {
    return res.status(401).json({Message:'Unauthorized'});
  }

  db_utils.getAllRowsFromTable('jobCategories').then(resp => {
    let body = resp.body;
    return res.status(resp.statusCode).json(body);
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
router.get('/jobposting/job/:jobid', async (req, res) => {
  console.log(req.params);
  if(Object.keys(req.body).length>0){
    return res.status(400).json({Message:'Bad Request'})
  }

  var decrypted = aes256.decrypt(key, req.query.API_KEY);
  console.log(decrypted);
  if(decrypted!=API_KEY){
    return res.status(401).json({Message:'Unauthorized'});
  }

  db_utils.getRowByID('jobOpenings', req.params.jobid).then(resp => {
    let body = resp.body;
    body['message'] = resp.message;
    return res.status(resp.statusCode).json(body);
  });
});

module.exports = router;
