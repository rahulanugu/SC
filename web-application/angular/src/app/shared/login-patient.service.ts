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

  private url = environment.serverUrl+"patient-login";
  constructor(private _http: HttpClient,
    private _router:Router) { }
  Loginpatient(Patient){
    return this._http.post<any>(this.url,Patient);
  }
  //check for avalibality of JWT in browser's storage
  loggedIn(){
    return !!localStorage.getItem('token');
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
    this._router.navigate(['patientlogin']);
  }
}
