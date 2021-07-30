const express = require("express");
const router = express.Router();
const { check, body, buildCheckFunction } = require('express-validator');

const db_utils = require('../db_utils');
const sec_utils = require('../security_utils');

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
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    console.log("posting a job to the database");

    const jobOpening = req.body;
    jobOpening['_id'] = generateId(10);
    // Add job opening to db
    const resp = await db_utils.insertUserIntoDB('jobOpenings', jobOpening);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    
    return res.status(200).json(jobOpening);
});

/**
 * The method will retrieve all the job openings in the database
 * Input: N/A
 * Output: Will return all the job openings in the database or error message along with
 *         the appropriate http status
 *         200 - Returned along with all the job openings
 *         404 - If there are no jobOpning available in the db.
 */
router.get('/jobposting', [
  body().isEmpty()
],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    // Get all job openings from db
    const resp = await db_utils.getAllRowsFromTable('jobOpenings');
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(resp.body);
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
router.get('/jobposting/:jobcategory', [
  body().isEmpty(),
  check('jobcategory').notEmpty()
],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    // Get job openings for jobcategory from db
    const resp = await db_utils.getRowFromTableWhere('jobOpenings', {'category': req.params.jobcategory})
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(resp.body);
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
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    
    console.log("posting a jobcategory to the database");
    const jobCategory = req.body;
    jobCategory['_id'] = generateId(10);
    console.log(jobCategory);
    // Add job category to db
    const resp = await db_utils.insertUserIntoDB('jobCategories', jobCategory);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(jobCategory);
});

/**
 * The method will retrieve all the job categories in the database
 * Input: N/A
 * Output: Will return all the job openings in the database or error message along with
 *         the appropriate http status
 *         200 - Returned along with all the job categories
 *         404 - If there are no jobCategory available in the db.
 */
router.get('/jobcategory', [
  body().isEmpty()
],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    // Get all job categories from db
    const resp = await db_utils.getAllRowsFromTable('jobCategories');
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(resp.body);
});



// get job details using id
/**
 * The method will retrieve the details of a particular jobposting searched by id
 * Input: Job Id
 * Output: Will return the details of the job if found or else will return an error status
 *         200 - If the job is found
 *         404 - If the job with the given Id is not found
 */
router.get('/jobposting/job/:jobid', [
  body().isEmpty(),
  check('jobid').notEmpty()
],
  async (req, res) => {
    // Validate API request
    const validate = sec_utils.APIRequestIsValid(req);
    if (validate.statusCode != 200) {
      return res.status(validate.statusCode).json({message: validate.message});
    }
    // Get job opening from db
    const resp = await db_utils.getRowByID('jobOpenings', req.params.jobid);
    if (resp.statusCode != 200) {
      return res.status(resp.statusCode).json({message: resp.message});
    }
    return res.status(200).json(resp.body);
});

module.exports = router;
