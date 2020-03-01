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
//creating a new db connection for local use
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

// method used to post a job to the database  : tested - false
router.post("/jobposting",async (req, res) => {
    console.log("posting a job to the database");
    var job = new JobOpening({
      title: req.body.title ,
      description: req.body.description ,
      salary: req.body.salary,
      location: req.body.location,
      email: req.body.email,
      category: req.body.category
    });
  
    job.save((err, doc) => {
      if (!err) {
        res.status(200).json({
          message: "Job opening saved in the database"
        });
        //mailer(req.body.FirstName, req.body.Email);
      } else {
        console.log("Unable to save the job opening in the database");
      }
    });
});

// method used to retrieve all job openings from the database  : tested - false
router.get('/jobposting', (req, res) => {
    JobOpening.find({},function(err,jobopenings){
        if(err){
            res.send("Could not retrieve job openings from DB");
            next();
        }
        res.json(jobopenings);
    });
});

// method used to retrieve all job openings based on category from the database  : tested - false
router.get('/jobposting/:jobcategory', (req, res) => {
  JobOpening.find({category: req.params.jobcategory},function(err,jobopenings){
      if(err){
          res.send("Could not retrieve job openings from DB");
          next();
      }
      res.json(jobopenings);
  });
});


// method used to post a job category
router.post("/jobcategory",async (req, res) => {
  console.log("posting a jobcategory to the database");
  var job = new JobCategory({
    title: req.body.title,
    description: req.body.description
  });

  job.save((err, doc) => {
    if (!err) {
      res.status(200).json({
        message: "Job category saved in the database"
      });
      //mailer(req.body.FirstName, req.body.Email);
    } else {
      console.log("Unable to save the job opening in the database");
    }
  });
});

// method used to retrieve all job categories from the database  : tested - false
router.get('/jobcategory', (req, res) => {
  console.log()
  JobCategory.find({},function(err,jobcategories){
      if(err){
          res.send("Could not retrieve job openings from DB");
          next();
      }
      res.json(jobcategories);
  });
});



// get job details using id
router.get('/jobposting/job/:jobid', (req, res) => {
    console.log("trying to retrieve the job")
    // check if id is valid
        JobOpening.findById(req.params.jobid, (err, result) => {
            if (!err) {
                console.log("result: " + result);
                res.status(200).send(result)
            }
            else {
                console.log('Error in retrieving jobopening with id: ' + JSON.stringify(err, undefined, 2));
            }
        })
});


// method used to post a jobapplication to the database  : tested - false
router.post("/jobapplication",upload.single('resume'), (req, res, next) => {
    console.log("New Job Application Recieved, rying to post to database");
    //console.log(req);
    //console.log(req.file);
    console.log(req.body);
    var jobApplication = new JobApplication({
      jobId: req.body.jobId,
      firstName: req.body.firstName ,
      lastName: req.body.lastName ,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zipcode: req.body.zipcode,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      resume: req.file.filename
      //resume path is currently the name with which it is stored in the database
    });
    jobApplication.save()
    .then(result => {
        //console.log(result);
        console.log("jobapplication has been posted to the database")
        res.status(201).json({message: 'created successfully'});
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//get a specific job application from db tested - true
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
router.get("/files", (req, res) => {
    console.log("Trying to retrieve all the resumes from the bucket resumes")
    gfs.find().toArray((err, files) => {
      // check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      } 
      return res.json(files);
    });
  });

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
