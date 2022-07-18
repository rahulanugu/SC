# BackEnd (NodeJs)


### ‘/patient’



*   GET(/patient)
    *   Retrieve all the patients that are in the database.
    *   200 , Successfully retrieved all the patients.
    *   404 , Error occurred while retrieving the patients.
*   GET(/patient/{id})
    *   Retrieve the specific information about a patient in the database.
    *   200 , Successfully retrieved the message.
    *   400, Error occurred while retrieving the patient info.
*   POST(/patient/{verify})
    *   Check if the patient already exists in the database.
*   POST(/patient)
    *   Generate a JWT token that contains the patient info which can be sent for verification. Also send an email that contains a JWT token to the patient who asked for registration.
    *   200 , Generated token and sent email.
    *   400 , Email already exists.


### ‘/patient-login’



*   POST(/patient-login)
    *   Authorize a patient user to login to their account.
    *   200 , Successfully authorized . Along with a jwt token signed with patient id and first name.
    *   404 , No patient exists.
    *   401 , Wrong password has been provided.


### ‘/request_access’



*   POST(/request_access)
    *   Record a request for access in the database and send an acknowledgement mail to the user who made the request.
    *   200 message has been saved and email sent.
    *   500 , Error has occured trying to record the request.

	


### ‘/verified’



*   POST(/verified)
    *   Verify the integrity of the JWT token and save the patient in the database on success.
    *   200 , successfully verified and saved the patient.
    *   400 , user already exists in the database.
    *   500 , error occured trying to save the patient inn the database.
    


### ‘/blog_service’



*   GET(/blog_service/keywordSelection)
    *   Extract keywords form the given blog content and send keywords back to frontend.
    *   200 , Succesfully returned an array of keyword extracted from content
    *   500 , Error occured in trying to the request.


### ‘/contact_us’



*   POST(/contact_us)
    *   Record a contact us request in the database and send an acknowledgement email to the user who made the request.
    *   200 , Succesfully saved the request in the database.
    *   500 , Error occured in trying to the request.


### ‘/careers’



*   POST(/careers/jobposting)
    *   Create a new job opening in the database.
    *   200 , Success.
    *   500 , Error.
*   GET(/careers/jobposting)
    *   Retrieve all the job openings in the database
    *   200 , Success
    *   404 , Error
*   GET(/careers/jobposting/{jobcategory})
    *   Retrieve all the job openings in the database with a particular jobcategory.
    *   200, Success
    *   404, Error
*   POST(/careers/jobcategory)
    *   Create a new job category in the database.
    *   200, Success.
    *   500, Error.
*   GET(/careers/jobcategory)
    *   Retrieve all the job categoriesin the database
    *   200, Success
    *   404, Error
*   GET(/careers/jobposting/job/{jobId})
    *   Retrieve the info of a particular jobposting in the database.
    *   200, Success
    *   404 , Error
*   POST(/careers/jobapplication)
    *   Saves a job application to the database
    *   201 , Success.
    *   500 , Error.
*   GET(/jobapplication/{filename})
    *   Retrieve the resume of a particular jobapplication.
    *   404 , Error
    *   200 , Open download stream
*   GET(/files)
    *   Retrieve the list of resumes available in the database.
    *   404 , Error
    *   200 , Success


### ‘Reset_password’



*   POST(/reset_password)
    *   Generate a jwt token upon request for resetting password and email it to owner of account.
    *   401 , Invalid email provided.
    *   200 , JWT created and email sent.
*   POST(/reset_password/check)
    *   Check the validity of the AES encrypted JWT token.
    *   401 , Invalid email provided.
    *   200 , JWT created and email sent.
*   POST(/reset_password/change_password)
    *   Update the password of the corresponding email id provided as part of the payload in the JWT token.
    *   500 , Error occured while trying to update the password.
    *   200 , Record has been successfully updated.
    *   404 , Email has not been found.


### ‘/backend/healthcare’



*   POST(/backend/healthcare/account/create)
    *   Request the creation of healthcare account, send an email for verification.
    *   400 , User already exists.
    *   500 , Mail could not be sent.
    *   200 , Successfully sent the verification mail.

-	POST(/backend/healthcare/account/verify)



    *   Verify and save the healthcarea ccount user.
    *   200 , User created.
    *   500 , Error occured trying to save the user.
    *   400 , User already exists.


### ‘/backend/healthcare-login’



*   POST(/backend/healthcare-login)
    *   Authorize a patient user to login to their account.
    *   200 , Successfully authorized . Along with a jwt token signed with patient id and first name.
    *   404 , No patient exists.
    *   401 , Wrong password has been provided.
*   POST(/backend/healthcare-login/verifytokenintegrity)
    *   Checki if the integrity of the jwt token is intact.
    *   200 , Successfully verified.
    *   400 , Bad request.
    *   401 , Integrity not intact.


### ‘/backend/deactivate’



*   POST(/backend/deactivate/patient)
    *   Deactivate the account of a patient portal user.
    *   Achieved by moving out a patient object from Patient database into DeactivatedPatient database
    *   200,  Successfully deactivated the patient
    *   500, An error occurred trying to perform the request
    *   404, Patient not found


### ‘/backend/reactivate’



*   POST(/backend/reactivate/patient/request)
    *   Make a reactivation account for a patient portal User
    *   Will send an email to the respective owner to verify that the right owner is making the reactivation request
    *   200, Successfully executed the request and sent mail.
    *   404, patient portal user not found.
*   POST(/backend/reactivate/patient/activate)
    *   Activate the account of a patient portal user after verifying the JWT token provided.
    *   Achieved by moving the patient object from DeactivatedPatient database to the Patient database.
    *   200, Successfully reactivated the patient.
    *   500, An error has occurred trying to perform the request.
    *   404, Patient not found.
