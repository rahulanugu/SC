import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Http calls for healthcare account components
 */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HealthcareAccountService {

  readonly baseURL = environment.serverUrl+"backend/healthcare";

  constructor(
    private http: HttpClient
  ) { }

  generateTokenForVerification(accountInfo){
    return this.http.post(this.baseURL+'/account/create'+environment.param,accountInfo);
  }

  verifyTokenAndCreateAccount(token){
    const healthCareProviderInfo = {
      jwtToken: token
    }
    return this.http.post(this.baseURL+"/account/verify",healthCareProviderInfo,httpOptions);
  }
}

