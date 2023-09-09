import { Router } from "@angular/router";
import { Patient } from "./patient.model";
import { environment } from "src/environments/environment";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * http calls and helper methods for the patient login components
 */
@Injectable({
  providedIn: "root",
})
export class LoginPatientService {
  
  
  
  private url = environment.serverUrl + "/patient-login" + environment.param;
  constructor(private _http: HttpClient, private _router: Router) {}
  Loginpatient(Patient) {
    return this._http.post<any>(this.url, Patient);
  }
  //check for avalibality of JWT in browser's storage
  async loggedIn() {//Checked by Yichen Huang in 07/06/2023
    console.log("Checking if logged in");
    //jwt payload description
    //_id: healthcareProvider._id, fname: healthcareProvider.firstName
    var jwtString = localStorage.getItem("token");
    var requestBody = {
      jwtToken: jwtString
    };
    //console.log(requestBody);
    return await this._http
    .post(environment.serverUrl + "/patient-login" + "/verifytokenintegrity", requestBody)//Corrected the URL by Yichen
    .toPromise();
  }

  verifyPatientEmail(tokentObj) {
    return this._http.patch(environment.serverUrl + "/patients/signup/verify-patient",tokentObj);
  }

  //get first name of logged in user
  getFname() {
    return localStorage.getItem("fname");
  }
  // //remove JWT from browser's local storage and log user out
  logOutPatient() {
    localStorage.removeItem("token");
    localStorage.removeItem("fname");
    localStorage.removeItem("_id");
    localStorage.removeItem("email");
    localStorage.removeItem("iat");
    localStorage.removeItem("exp");
    this._router.navigate(["healthcare/login"]);
  }
  cleanLocalStorage() {//Added By Yichen Huang, clean all info in local storage
    localStorage.removeItem("token");
    localStorage.removeItem("caregiver");  
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("UserInfo");
  }
}