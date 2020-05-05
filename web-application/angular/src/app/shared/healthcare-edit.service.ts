import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HealthcareEditService {

  constructor(private http: HttpClient) { }

  readonly deactivateUrl = environment.serverUrl+"backend/deactivate";
  readonly reactivateUrl = environment.serverUrl+"backend/reactivate";


  deactivateAccount(healthcareDetails){
    return this.http.post(this.deactivateUrl+'/healthcare',healthcareDetails);
  }

  makeReactivateRequest(healthcareDetails){
    //patinet details - { "email" : "email@example.com"}
    console.log("making backend request")
    return this.http.post(this.reactivateUrl+'/healthcare/request',healthcareDetails);
  }

  reactivateAccount(healthcareDetails){   
    //patient details - { "token" : "jwttoken"}
    return this.http.post(this.reactivateUrl+'/healthcare/activate',healthcareDetails);
  }
}
