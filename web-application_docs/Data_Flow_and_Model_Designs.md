5/13/20

**Questions to be asked from the Front-End POV**



*   **Patient User**
    *   **Using the invite they register for the application. (step 4)**
    *   **Maintain an array of hospitals they are linked with. (We might support a few of them). (step 5)**
    *   **Maintain a log of people who have viewed their EHR system. **
*   **Healthcare Provider (Person who belongs to hospital)**
    *   **Have a tie-up with a hospital (assuming that the EHR system used is supported by us) (step 1)**
    *   **We get the patient Id’s from the hospital (step 2)**
    *   **Send out an invite to patients asking to register with our application (registration link that is sent would open up a form with patientId prefilled( EHR ID , EHR Name)). - Making sure the invite has a functionality of providing patients an option to choose that they already have a scriptchain account. (step 3)**
    *   **HCP can view a patient’s EHR in the scriptchain application. (Potential search parameters - EHR patientId )**

**Questions to be asked from the BACK-End POV**



*   **Finalize the models that are required ( Patient , HCP, Vitals signs, Medication )**
    *   **What is the data that is being displayed in the frontend.**
    *   **Patient model -> user provided info + API data**
    *   **Vital Signs, medication -> driven by the API**
*   **Mock data that conform to finalized data models can be used to design and implement the frontend.**
*   **REST/SOAP -> The backend API will have support methods to format the data coming in from external API and format it to our needs.**

**Potential Implementation Approach**
