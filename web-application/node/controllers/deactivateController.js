const express = require("express");
const router = express.Router();
const { Patient } = require('../models/user');
const { HealthcareProvider } = require('../models/healthcareProvider');
const { DeactivatedPatient } = require('../models/deactivatedUser');
const { DeactivatedHealthcareProvider } = require('../models/deactivatedHealthcareProvider');
const fs = require('fs');
const {BigQuery} = require('@google-cloud/bigquery');
const { table } = require("console");
const options = {
    keyFilename: '/Users/srikarpothumahanti/Desktop/scriptchain/web-application/node/serviceAccountKeys/scriptchainprod-96d141251382.json',
    projectId: 'scriptchainprod'

};
const bigquery = new BigQuery(options);

//The controller handles the requests for deactivating user accounts

/**
 * Method to move a patient object from Patient database to DeactivatedPatient database
 * Input: Body containing the email of the patient to be deactivated
 *         Body - { email: "example@abc.com"}
 * Output: Status of the save operation
 *         200 - Successfylly deactivated the patient
 *         500 - An error occured trying to perform the request
 *         404 - Patient not found
 */
router.post("/patient", async (req, res) => {
    console.log("reached deacivate controller");
    const query1 = 'SELECT * FROM `scriptchainprod.ScriptChain.patients` WHERE Email='+'"'+
    req.body.Email+'"';
    bigquery.query(query1, function(err, row) {
        if(!err) {
            if (row){
                const query2 = 'DELETE FROM `scriptchainprod.ScriptChain.patients` WHERE Email='+'"'+
                req.body.Email+'"';
                bigquery.query(query2, function(err, row1) {
                    if(err){
                        res.status(500).json({"message": "account could not be deactivated due to an error"});
                        next();
                    }else{
                        const filename = 'deactivatePatientsTmp.json';
                        const datasetId = 'ScriptChain';
                        const tableId = 'deactivatedPatients';
                
                        fs.writeFileSync(filename, JSON.stringify(row[0]));
                        
                        const table = bigquery.dataset(datasetId).table(tableId);
                
                        // Check the job's status for errors
                        //const errors = job.status.errors;
                        table.load(filename,(err,res1) =>{
                            if (err && err.length > 0) {
                                console.log("Error occured in deactivate controller"+err);
                                res.status(500).json({"message": "account could not be deactivated due to an error"});
                                console.log('Error in saving patient: ' + JSON.stringify(err, undefined, 2));
                            }else{
                                //console.log(`Job ${job.id} completed.`);
                                res.status(200).json({
                                    "message":"account has been deactivated"
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(404).json({"messsage": "An account could not be found with the email provided"})
            }
    }
    });

    
    
    


});

/**
 * Method to move a patient object from HealthcareProvider database to DeactivatedHealthcareProvider database
 * Input: Body containing the email of the HealthcareProvider to be deactivated
 *         Body - { email: "example@abc.com"}
 * Output: Status of the save operation
 *         200 - Successfylly deactivated the HealthcareProvider
 *         500 - An error occured trying to perform the request
 *         404 - HealthcareProvider not found
 */
router.post("/healthcare", async (req, res) => {
    console.log("reached deacivate controller");

    const retrievedHealthcareProvider = await HealthcareProvider.findOne({email: req.body.email})

    
    if (retrievedHealthcareProvider){

        const deleteStatus = await HealthcareProvider.deleteOne({email: req.body.email})
    
        if(deleteStatus.n != 1){
            console.log("An error has occured while trying to delete the patient entry from the patient database")
            res.status(500).json({"message": "account could not be deactivated due to an error"});

        }
        //return res.status(200).send('Email has to be deactivated')
    
        const deactivatedHealthcareProvider = new DeactivatedHealthcareProvider({
            firstName: retrievedHealthcareProvider.firstName,
            lastName: retrievedHealthcareProvider.lastName,
            companyName: retrievedHealthcareProvider.companyName,
            location: retrievedHealthcareProvider.location,
            roleInCompany: retrievedHealthcareProvider.roleInCompany,
            email: retrievedHealthcareProvider.email,
            password: retrievedHealthcareProvider.password,
            phone: retrievedHealthcareProvider.phone
        });

        deactivatedHealthcareProvider.save((err, doc) => {
            if (!err) {
                // returns saved patient and 24hex char unique id
                
                res.status(200).json({"message":"account has been deactivated"});
            }
            else {
                console.log("Error occured in deactivate controller"+err);
                res.status(500).json({"message": "account could not be deactivated due to an error"});
                console.log('Error in saving patient: ' + JSON.stringify(err, undefined, 2));
            }
        });
    } else {
        res.status(404).json({"messsage": "An account could not be found with the email provided"})
    }


});

module.exports = router;
