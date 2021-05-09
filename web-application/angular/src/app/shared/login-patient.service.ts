import { Router } from '@angular/router';
import { Patient } from './patient.model';
import { environment } from "./../../environments/environment";


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * http calls and helper methods for the patient login components
 */
@Injectable({
  providedIn: 'root'
})
export class LoginPatientService {

  private url = environment.serverUrl+"patient-login"+environment.param;
  constructor(private _http: HttpClient,
    private _router:Router) { }
  Loginpatient(Patient){
    return this._http.post<any>(this.url,Patient);
  }
  //check for avalibality of JWT in browser's storage
  async loggedIn(){
    console.log("Checking if logged in")
    //jwt payload description
    //_id: healthcareProvider._id, fname: healthcareProvider.firstName
    var jwtString = localStorage.getItem('token');
    var requestBody = {
      jwtToken: jwtString
    }
    //console.log(requestBody);
    return await this._http.post(this.url+"/verifytokenintegrity",requestBody).toPromise();
  }
  //get first name of logged in user
  getFname()
  {
    return localStorage.getItem('fname');
  }
  //remove JWT from browser's local storage and log user out
  logOutPatient(){
    localStorage.removeItem('token');
    localStorage.removeItem('fname');
    localStorage.removeItem('email');
    this._router.navigate(['healthcare/login']);
  }
}
