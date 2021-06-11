import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HealthcareEditService {

  constructor(private http: HttpClient) { }

  readonly deactivateUrl = environment.serverUrl+"backend/deactivate";
  readonly reactivateUrl = environment.serverUrl+"backend/reactivate";


  deactivateAccount(healthcareDetails){
    return this.http.post(this.deactivateUrl+'/healthcare'+environment.param,healthcareDetails);
  }

  makeReactivateRequest(healthcareDetails){
    //patinet details - { "email" : "email@example.com"}
    console.log("making backend request")
    return this.http.post(this.reactivateUrl+'/healthcare/request'+environment.param,healthcareDetails);
  }

  reactivateAccount(healthcareDetails){   
    //patient details - { "token" : "jwttoken"}
    return this.http.post(this.reactivateUrl+'/healthcare/activate'+environment.param,healthcareDetails);
  }
}
