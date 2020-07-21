const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
var { JobOpening } = require("../models/jobOpenings");
var { JobApplication } = require("../models/jobApplications");
var {JobCategory} = require("../models/jobCategories");
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("../db");
const mongoURI = "mongodb+srv://scriptchain:hello925@cluster0-se5v0.gcp.mongodb.net/scriptchain?retryWrites=true&w=majority"
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);

/**
 * The contoller is used to serve the needs of the careers portal of the
 * web application.
 */

//creating a new db connection for local use
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Checkingg if tthe file id of the requored format
const fileFilter = (req,file,cb) => {
    console.log("THe file is being checked");
    if(file.mimetype === "application/pdf"){
        cb(null,true);
    } else{
        cb(new Error("Invalid type of file is being tried to upload, please send pdf only."),false);
        cb(null,false);
    }

}

//getting the gridfs from db instance
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "resumes"
  });
});

//creating a new storage file
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: "resumes"
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({storage,fileFilter: fileFilter});

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

router.post("/jobposting",async (req, res) => {
    console.log("posting a job to the database");
    req.body['_id'] = generateId(10);
    /*if(Object.keys(req.body).length!=7){
      res.status(500).json({
        message: "Cannot save job in the database"
      })
    }*/
    const filename = 'jobPostingTmp.json';
    const datasetId = 'ScriptChain';
    const tableId = 'jobOpenings';

    fs.writeFileSync(filename, JSON.stringify(req.body));

    const [job] = await bigquery
      .dataset(datasetId)
      .table(tableId).load(filename);

    // Check the job's status for errors
    const errors = job.status.errors;
    if (errors && errors.length > 0) {
      res.status(500).json({
        message: "Cannot save job in the database"
      })
    }else{
      console.log(`Job ${job.id} completed.`);
      res.status(200).json({
        message: "Job opening saved in the database"
      });
    }

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
    const datasetId = 'ScriptChain';
    const tableId = 'jobOpenings';
    const table = bigquery
      .dataset(datasetId)
      .table(tableId);
    table.getRows((err, rows) => {
      if (!err) {
        res.status(200).json(rows);
      }else{
        res.status(404).send({message: "Could not retrieve job openings from DB"});
        next();
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
router.get('/jobposting/:jobcategory', (req, res) => {
  const query = 'SELECT * FROM `scriptchainprod.ScriptChain.jobOpenings` WHERE category=@category';
  // req.params.jobcategory+'"';
  const bigQueryOptions = {
    query: query,
    location: 'US',
    params: {category:req.params.jobcategory}
  }
  bigquery.query(bigQueryOptions, function(err, rows) {
    if(!err) {
      res.status(200).json(rows);
    }else{
      res.status(404).send({message: "Could not retrieve job openings from DB"});
      next();
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
router.post("/jobcategory",async (req, res) => {
  console.log("posting a jobcategory to the database");
  req.body['_id'] = generateId(10);
    /*if(Object.keys(req.body).length!=3){
      res.status(500).json({
        message: "An error has occured trying to save the job categgory in the database"
      })
    }*/
    const filename = 'jobCategoryTmp.json';
    const datasetId = 'ScriptChain';
    const tableId = 'jobCategories';

    fs.writeFileSync(filename, JSON.stringify(req.body));

    const [job] = await bigquery
      .dataset(datasetId)
      .table(tableId).load(filename);

    // Check the job's status for errors
    const errors = job.status.errors;
    if (errors && errors.length > 0) {
      res.status(500).json({
        message: "An error has occured trying to save the job categgory in the database"
      })
    }else{
      console.log(`Job ${job.id} completed.`);
      res.status(200).json({
        message: "Job category saved in the database"
      });
    }

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
  const query = 'SELECT * FROM `scriptchainprod.ScriptChain.jobCategories` WHERE 1=1';
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
router.get('/jobposting/job/:jobid', (req, res) => {

    console.log("trying to retrieve the job")

    const query1 = 'SELECT * FROM `scriptchainprod.ScriptChain.jobOpenings` WHERE _id=@id';
  // req.params.jobid+'"';
  const bigQueryOptions1 = {
    query: query1,
    location: 'US',
    params: {id:req.params.jobid}
  }
    bigquery.query(bigQueryOptions1, function(err, rows) {
      if(!err) {
        res.status(200).json(rows);
      }else{
        res.status(404).send({message: "Could not retrieve job openings from DB"});
        next();
      }
    });
});


// method used to post a jobapplication to the database  : tested - false
/**
 * The method will save the job application in the database
 * Input: Job application details as specified in the JobApplication schema + The resume file
 * Output: The status of the save operation
 *         201 - succesfully saved the applicattion in db
 *         500 - When an error occurs trying to the save the application
 */
router.post("/jobapplication",upload.single('resume'), async (req, res, next) => {
    console.log("New Job Application Recieved, trying to post to database");
    //console.log(req);
    //console.log(req.file);
    req.body['_id'] = generateId(10);
    /*if(Object.keys(req.body).length!=11){
      res.status(500).json({
        message: "Cannot save jobapplication in the database"
      })
    }*/
    const filename = 'jobApplicationTmp.json';
    const datasetId = 'ScriptChain';
    const tableId = 'jobApplications';

    fs.writeFileSync(filename, JSON.stringify(req.body));

    const [job] = await bigquery
      .dataset(datasetId)
      .table(tableId).load(filename);

    // Check the job's status for errors
    const errors = job.status.errors;
    if (errors && errors.length > 0) {
      res.status(500).json({
        message: "Cannot save jobapplication in the database"
      })
    }else{
      console.log(`Job ${job.id} completed.`);
      res.status(200).json({
        message: "Job Application saved in the database"
      });
    }
});

/**
 * Method is used to retrieve a specific resume of application from the database
 * Input: Name of the resume
 * Output: Resume if found
 *         200 - Resume is found
 *         404 - Resume with the given name was not found
 */
router.get("/jobapplication/:filename", (req, res) => {
    // console.log('id', req.params.id)
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
});


//get a list of all the resumes in the bucket
/**
 * The method will be used to get a list of all the resumes from the mongo bucket
 * Input: N/A
 * Output: A list of all the resumes
 *         200 - All resumes found
 *         404 - Could not find any resume in the database
 */
router.get("/files", (req, res) => {
    console.log("Trying to retrieve all the resumes from the bucket resumes")
    gfs.find().toArray((err, files) => {
      // check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      return res.status(200).json(files);
    });
  });


/**
 * Mailer for sending the emails
 * @param {First name of reciever} fname
 * @param {Destination of Email} email
 */
function mailer(fname, email) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "noreply@scriptchain.co",
        clientId:
          "16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
        clientSecret: "ZYdS8bspVNCyBrSnxkMxzF2d",
        refreshToken: "1/dK9w2flF6s52UnPPsQvjcM35pXvwu5z8PSQULIWCCgo",
        accessToken: accessToken
      }
    });
    let mailOptions = {
      from: "badchhapesumod100@gmail.com",
      to: email,
      subject: "Hey it's Moh from ScriptChain",
      html:
        `<!DOCTYPE html>
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
              <p class="para">Hi ` +
        fname +
        `,</p>
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
        return log("Error occurs");
      }
      return log("Email sent!!!");
    });
}

module.exports = router;
