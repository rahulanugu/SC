|     | Frontend Component                   | Frontend Route                | Backend Component                         | Backend Route Url                  | Backend Route Method | Database Table         |Table Datasource         |
| --- | ------------------------------------ | ----------------------------- | ----------------------------------------- | ---------------------------------- | -------------------- | ---------------------- |---------------------- |         
| 1   | HealthcareLoginComponent             | healthcare/login              | healthcareProviderLoginController         | /backend/healthcare-login          | POST                 | SignupHealthcareProviders    |User Information of provider portal (stored into table after they verify their email address
| 2   | HealthcareResetPasswordComponent     | healthcare/password/reset     | healthcareProviderResetPasswordController | /backend/healthcare/reset_password | POST                 | SignupHealthcareProviders    |User Information of provider portal (stored into table after they verify their email address  
| 3   | HealthcareResetPasswordPageComponent | healthcare/password/resetpage | healthcareProviderResetPasswordController | /backend/healthcare/reset_password | PATCH                | SignupHealthcareProviders    |User Information of provider portal (stored into table after they verify their email address   
| 4   | PatientComponent                     | patient/login                 | patientLoginController                    | /patient-login                     | POST                 | patientsnew            |User Information of patient portal         
| 5   | ResetPasswordComponent               | patient/password/reset        | resetPasswordController                   | /reset_password                    | POST                 | patientsnew            |User Information of patient portal         
| 6   | ResetPasswordPageComponent           | patient/password/resetpage    | resetPasswordController                   | /reset_password                    | PATCH                | patientsnew            |User Information of patient portal
| 7   | HealthcarePatientPortalComponent     | healthcare/patientportal      | healthcareProviderAddUserController       | /backend/healthcare/add-user       | GET                  | AddUser_ProviderPortal |User(patient or caregiver)added by provider, to allow them access patient portal
| 8   | HealthcareAddUserComponent           | healthcare/adduserpatient     | healthcareProviderAddUserController       | /backend/healthcare/add-user       | POST                 | AddUser_ProviderPortal |User(patient or caregiver)added by provider, to allow them access patient portal
| 9   | Request-Access                       | /request-access               | requestAccestController                   | /request_access                    | POST                 | request_access         |
| 10  | contact-us                           | /contact-us                   | requestAccestController                   | /contact_us                        | POST                 | contactUsers           |
| 11  | patient-signup                       | /patients/signup              | patientNewController                      | /patients/signup                   | POST                 | patientsnew            |User Information of patient portal
| 12  | HealthcareLoginComponent             | /healthcare/login             | healthcareProviderLoginController         | /backend/healthcare-login          | POST                 | healthcareproviders    |Log timestamp everytime a healthcareprovider login, delete outdated record(more than 180 days) every day automatically
| 13  | patient-signup                       | /patients/signup              | patientNewController                      | /patients/signup                   | POST                 | patients               |Patients' detailed information
| 14  | CaregiverProfileComponent            | /patients/caregiverid/:id     | patientController                         | /patient/:id                       | GET                  | tokenSchema            |Encrypted User Information of new-registered provider, used before they verify their email address
