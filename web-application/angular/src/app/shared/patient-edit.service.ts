import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientEditService {
  readonly baseURL = environment.serverUrl+"backend/editpatient";
  readonly deactivateUrl = environment.serverUrl+"backend/deactivate";
  readonly reactivateUrl = environment.serverUrl+"backend/reactivate";

  
  constructor(private http: HttpClient) {}

    changeFirstName(patientDetails) {
      return this.http.put(this.baseURL+'/fname'+environment.param,patientDetails);
    }

    changeLastName(patientDetails) {
      return this.http.put(this.baseURL+'/lname'+environment.param,patientDetails);
    }
    changePhoneNumber(patientDetails) {
      return this.http.put(this.baseURL+'/phone'+environment.param,patientDetails);
    }
    changePassword(patientPasswords) {
      console.log("Have reached the changepassword")
      console.log(patientPasswords)
      return this.http.put(this.baseURL+'/password'+environment.param,patientPasswords);
    }

    deactivateAccount(patientDetails){
      return this.http.post(this.deactivateUrl+'/patient'+environment.param,patientDetails);
    }

    makeReactivateRequest(patientDetails){
      //patinet details - { "email" : "email@example.com"}
      console.log("making backend request")
      return this.http.post(this.reactivateUrl+'/patient/request'+environment.param,patientDetails);
    }

    reactivateAccount(patientDetails){
      //patient details - { "token" : "jwttoken"}
      return this.http.post(this.reactivateUrl+'/patient/activate'+environment.param,patientDetails);
    }
   
}
