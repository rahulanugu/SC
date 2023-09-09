# Frontend Components Report

author: Siheng

date: 02/20/2023

---

There are lots of components that contain html&head&body tags, which violate bullet 5&6 of Important Notes on [Frontend Documentation](https://docs.google.com/document/d/1Y5byMoF_FN7QK9fz6U7KPct3xcCky3w8WjN-gmNmuVQ/edit). So they need to be refactored. In this report, I will list all the components that I have refactored for this purpose. By the way, I also handled several hardcode issues to make the codebase easier to update and maintain.

Another two parts that I found when I review the components are that several components may not be used anymore, or it is needed to be fixed.

---

## Components Refactored

Not only refactored html&head&body tags, but also used more professional Angular syntax to handle the hardcode issues to make the code easier to maintain.

- landing-who-we-are
- landing-partnerships
- blog
- landing-faq1
- landing-page
- employee
- apply-job
- becomepartner (add more space above the footer)
- contact (add more space above the footer)
- healthcare-account-settings
- privacy-policy
- request-access
- terms-conditions

Before the refactoring, the html&&head&tag are inside the components. After refactoring, it displays just the content inside the components.

![alt text](../Images/FrontendComponentsReport_images/image1.png)

## Components may not be needed

- advisor
  - Both employee and advisor, share the same employee component, and the advisor component is not used anywhere.
- apply-job
  - It seems that we do not use this to post new positions anymore
  - https://scriptchain.co/apply-job/6
- job-openings
  - just a hello on the page
  - https://scriptchain.co/job-openings
- landing-careers
  - no routes linked to it

## Components need to be fixed if they are in use

- LoginComponent (https://scriptchain.co/login)
  ![alt text](../Images/FrontendComponentsReport_images/image2.png)

- DeactivatedPatientComponent (https://scriptchain.co/deactivatedpatient)
  ![alt text](../Images/FrontendComponentsReport_images/image3.png)

- HealthcareResetPasswordComponent (https://scriptchain.co/healthcare/password/reset)
  ![alt text](../Images/FrontendComponentsReport_images/image4.png)

- HealthcareResetPasswordPageComponent (https://scriptchain.co/healthcare/password/resetpage)
  ![alt text](../Images/FrontendComponentsReport_images/image5.png)

- PatientManageProfileComponent (http://localhost:4200/editpatient)
  ![alt text](../Images/FrontendComponentsReport_images/image6.png)

- RegPatientComponent & PatientRegisterthreeComponent & PatientRegistertwoComponent

  - these three components are all linked to the http://localhost:4200/patient/register
  - it cannot be reached on the production version https://scriptchain.co/patient/register
  - so they may not be in use. If they are in use, they need to be fixed
    ![alt text](../Images/FrontendComponentsReport_images/image7.png)

- ReactivateHealthcareProviderComponent (https://scriptchain.co/reactivatehealthcareprovider)
  ![alt text](../Images/FrontendComponentsReport_images/image8.png)

- ReactivatePatientComponent (https://scriptchain.co/reactivatepatient)
  ![alt text](../Images/FrontendComponentsReport_images/image9.png)

- RegisterComponent (https://scriptchain.co/register)
  ![alt text](../Images/FrontendComponentsReport_images/image10.png)

- ResetPasswordComponent (https://scriptchain.co/patient/password/reset)
  ![alt text](../Images/FrontendComponentsReport_images/image11.png)

- ResetPasswordPageComponent (https://scriptchain.co/patient/password/resetpage)
  ![alt text](../Images/FrontendComponentsReport_images/image12.png)
