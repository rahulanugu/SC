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

  search(lastname,firstname,dob){
    //const headers = {"Authorization":"Bearer "+localStorage.getItem("access_token")};
    const headers = {"Content-Type": "application/x-www-form-urlencoded","Authorization":"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiI3ODhhNWY0NS04ZmNjLTRhZDktYmNlNi1lN2VlZWZjOGFjNDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoiUnViajBKRDg1ZndqZ0VXYm00akxLY050b3laZkZuQkpsYWR6ODVWcGhreGVtMDBnUUlhVzBac3QydlQxU01JZ0FpOGZrN25iUXB4NHd5cXVwMjROa1hkZGZwTzVYandGdWxqNy1vaHVEekxhdmQ5U3ktVERrYjlDTW9wWFdjODYiLCJlcGljLnRva2VudHlwZSI6ImFjY2VzcyIsImV4cCI6MTYwMjAyMDM4NSwiaWF0IjoxNjAyMDE2Nzg1LCJpc3MiOiJ1cm46b2lkOmZoaXIiLCJqdGkiOiIyZWM5MzYxMC0yMDg3LTRlYzctYmZlNy1iNTJjNWFhZWMzZTMiLCJuYmYiOjE2MDIwMTY3ODUsInN1YiI6ImVtU2pyRUQwRUJaUDJsVTdlU3lQRTZ3MyJ9.KGTg0Z8lOWKGpdl7Yr_bFV2wC_5rTdgJl-Q9DTlXndsqXlcaKpRETbC7QhpT0PRFkldIzibpHv-b2PrRNvbKsQN4l2t-W7_ucYcUkHK9vPJ98YJnv3VsHDqT_M5sq7wKNOZ1I5aawnXAjZjbgHDgu9tm_KLMwTq9z2DY8EVpeEa1QG4iPdwuCtEGS9Lwc_TuOaNPkUxcobyxnUnjY6Nsg36hOCLbkRBPmr_MFYbjZ4-6wvJCW4eUst9OztC8EL4GXDfgXC73ThtODjBPWlMXP-BSSYvnLrqRLPV632z2j15nKz9yWsJz12aQn3a8444YmmwdJt50fNWBdZU6RFojqw"};
    console.log(headers);
    return this.http.get("https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2/Patient?family="+lastname+"&given="+firstname+"&birthdate="+dob,{headers});
  }
} 
