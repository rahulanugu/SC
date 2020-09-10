import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from "./../../environments/environment";

/**
 * http calls for verifying jwt tokens
 */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  //create url that verifies the token then adds the user then 
  //send back okay result to client side
  baseURL = environment.serverUrl+"verified";

  constructor(private _http:HttpClient) { }

  postVerifiredToken(token){
    //console.log('token is')
    //console.log(token)
    // for verification using jwt only
    //const fPart = myJSON.split('.')[1];
    //const patientInfo = JSON.parse(window.atob(fPart));
    //console.log("Patient is")
    //console.log(patientInfo)
    const patientInfo = {
      jwtToken: token
    }
    return this._http.post(this.baseURL+environment.param,patientInfo,httpOptions);

    // verification using jwt and token
    // return this._http.post(this.baseURL,{headers:{Authorization : `Bearer ${token}`}},httpOptions);
  } 
}
