import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthcareLoginService {

  readonly baseURL = environment.serverUrl + "backend/healthcare-login";

  constructor(
    private http: HttpClient
  ) { }

  healthcareProviderLogin(loginFormDetails){
    return this.http.post(this.baseURL+environment.param,loginFormDetails);
  }

  /**
   * Description: Check if the user is logged in
   * Verify the integrity of the jwt token from backend
   */
  loggedIn(){
    console.log("Checking if logged in")
    //jwt payload description
    //_id: healthcareProvider._id, fname: healthcareProvider.firstName
    var jwtString = localStorage.getItem('token');
    var requestBody = {
      jwtToken: jwtString
    }
    //console.log(requestBody);
    return this.http.post(this.baseURL+"/verifytokenintegrity",requestBody);
  }
}
