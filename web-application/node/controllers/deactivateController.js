const express = require("express");
const router = express.Router();
const { Patient } = require('../models/user');
const { DeactivatedPatient } = require('../models/deactivatedUser');

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

    const retrievedPatient = await Patient.findOne({Email: req.body.email})

    
    if (retrievedPatient){

        const deleteStatus = await Patient.deleteOne({Email: req.body.email})
    
        if(deleteStatus.n != 1){
            console.log("An error has occured while trying to delete the patient entry from the patient database")
            res.status(500).json({"message": "account could not be deactivated due to an error"});

        }
        //return res.status(200).send('Email has to be deactivated')
    
        const deactivatedPatient = new DeactivatedPatient({
            fname: retrievedPatient.fname,
            lname: retrievedPatient.lname,
            Email: retrievedPatient.Email,
            address: retrievedPatient.address,
            phone: retrievedPatient.phone,
            birthday: retrievedPatient.birthday,
            sex: retrievedPatient.sex,
            ssn: retrievedPatient.ssn,
            allergies: retrievedPatient.allergies,
            ec: retrievedPatient.ec,
            ecPhone: retrievedPatient.ecPhone,
            ecRelationship: retrievedPatient.ecRelationship,
            password: retrievedPatient.password,
            anemia: retrievedPatient.anemia,
            asthma:retrievedPatient.asthma,
            arthritis: retrievedPatient.arthritis,
            cancer: retrievedPatient.cancer,
            gout: retrievedPatient.gout,
            diabetes: retrievedPatient.diabetes,
            emotionalDisorder: retrievedPatient.emotionalDisorder,
            epilepsy: retrievedPatient.epilepsy,
            fainting: retrievedPatient.fainting,
            gallstones: retrievedPatient.gallstones,
            heartDisease: retrievedPatient.heartDisease,
            heartAttack: retrievedPatient.heartAttack,
            rheumaticFever: retrievedPatient.rheumaticFever,
            highBP: retrievedPatient.highBP,
            digestiveProblems: retrievedPatient.digestiveProblems,
            ulcerative: retrievedPatient.ulcerative,
            ulcerDisease: retrievedPatient.ulcerDisease,
            hepatitis: retrievedPatient.hepatitis,
            kidneyDiseases: retrievedPatient.kidneyDiseases,
            liverDisease: retrievedPatient.liverDisease ,
            sleepApnea: retrievedPatient.sleepApnea,
            papMachine: retrievedPatient.papMachine,
            thyroid: retrievedPatient.thyroid,
            tuberculosis: retrievedPatient.tuberculosis,
            venereal: retrievedPatient.venereal,
            neurologicalDisorders: retrievedPatient.neurologicalDisorders,
            bleedingDisorders: retrievedPatient.bleedingDisorders,
            lungDisease: retrievedPatient.lungDisease,
            emphysema: retrievedPatient.emphysema,
            none: retrievedPatient.none,
            drink: retrievedPatient.drink,
            smoke: retrievedPatient.smoke
        });

        deactivatedPatient.save((err, doc) => {
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
