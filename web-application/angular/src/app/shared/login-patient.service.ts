import { Router } from '@angular/router';
import { Patient } from './patient.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginPatientService {

  private url = environment.serverUrl;
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
    this._router.navigate(['patient/login']);
  }
}
