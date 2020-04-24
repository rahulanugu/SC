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
      return this.http.put(this.baseURL+'/fname',patientDetails);
    }

    changeLastName(patientDetails) {
      return this.http.put(this.baseURL+'/lname',patientDetails);
    }
    changePhoneNumber(patientDetails) {
      return this.http.put(this.baseURL+'/phone',patientDetails);
    }
    changePassword(patientPasswords) {
      console.log("Have reached the changepassword")
      console.log(patientPasswords)
      return this.http.put(this.baseURL+'/password',patientPasswords);
    }

    deactivateAccount(patientDetails){
      return this.http.post(this.deactivateUrl+'/patient',patientDetails);
    }

    makeReactivateRequest(patientDetails){
      //patinet details - { "email" : "email@example.com"}
      console.log("making backend request")
      return this.http.post(this.reactivateUrl+'/patient/request',patientDetails);
    }

    reactivateAccount(patientDetails){
      //patient details - { "token" : "jwttoken"}
      return this.http.post(this.reactivateUrl+'/patient/activate',patientDetails);
    }
   
}
