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
    const headers = {"Authorization":"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoicXRjeG8wNlpXTzB4UlhRb044ZjRzcWJDUGxJWUt6NGxocTM3UHE1R0w0N0VKekdCUVJkSjVCUmRacFRGUmRHRU9CeE9TTHdnd3p3ZXlzTVB3T0Q1eDRMd08ySEtEYzNqSzJjSXBWYkJwNWJYbWtxOTBIM0g2Sm9qT3ZyUG9ORWwiLCJlcGljLnRva2VudHlwZSI6ImFjY2VzcyIsImV4cCI6MTYwMTQwMjg4MywiaWF0IjoxNjAxMzk5MjgzLCJpc3MiOiJ1cm46b2lkOmZoaXIiLCJqdGkiOiJjZjVkYzNkMy1iZDBjLTQxOTktOWU4Ni1lNWQ2ZmVhZjI5ZDMiLCJuYmYiOjE2MDEzOTkyODMsInN1YiI6ImV4Zm82RTRFWGpXc25oQTFPR1ZFbGd3MyJ9.CxP3Q19Q5xNT65odULbHqGhf7Dfy7sCLOgkPFq1kyCwjLe7Dyjj_A8m0qwVt4GbifKu9wo3qwddnmd2koCTVsqXEnUPJwgzvlbk9e9K3yTzaMVP69ceCqbSxy4M4Z4LDcyGCQm0E1jtg5U07RSMbQpTzxdp5nvVXgRkIyl3A0PcSW3sQtrGy0hE7PzX6EUXwr1-u32ynNJL2UBNd6N-0MV3NQ3m8CVuXvnbmjyK9CHJaUZesvA8m_d1TZ27r8eXjeXjoz4ps5R6upNoKYPk_SD_nwcPdofSOsV_AhHda8zV8CgAY7X23-MmKDR2-ztt8MFSlmbppDSGCWC9G6HxydQ"};
    return this.http.get("https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2/Patient?family="+lastname+"&given="+firstname+"&birthdate="+dob,{headers});
  }
} 
