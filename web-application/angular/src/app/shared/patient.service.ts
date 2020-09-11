import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Patient } from './patient.model';
import { PatientBasic } from './patient.basic.model';
import { environment } from 'src/environments/environment';

/**
 * Http methods for patient services
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

/**
 * patient.servce.ts
 * Allows Angular app to make post request to database using node.js endpoints
 */

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  selectedPatient: Patient;
  patients: Patient[]; // all patients from mongodb
  readonly baseURL = environment.serverUrl+"patient";
  readonly checkURL = environment.serverUrl+'patient/verify'

  constructor(private http:HttpClient) { }

  getPatient(): Observable<PatientBasic[]>{
    return this.http.get<PatientBasic[]>(this.baseURL);
  }

  postPatient(pat : Patient){
    // make post request
    return this.http.post(this.baseURL+environment.param, pat);
  }

  checkUser(user){
    const obj = {'user':user}
    return this.http.post(this.checkURL+environment.param,obj);
  }
} 
