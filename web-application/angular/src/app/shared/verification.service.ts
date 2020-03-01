import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  baseURL = environment.serverUrl;

  constructor(private _http:HttpClient) { }

  postVerifiredToken(token){

    // for verification using jwt only
    var myJSON = JSON.stringify(token)
    const fPart = myJSON.split('.')[1];
    const patientInfo = JSON.parse(window.atob(fPart));
    
    return this._http.post(this.baseURL,patientInfo,httpOptions);

    // verification using jwt and token
    // return this._http.post(this.baseURL,{headers:{Authorization : `Bearer ${token}`}},httpOptions);
  } 
}
