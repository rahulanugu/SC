import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

/**
 * http calls for the reset password components
 */
@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService {

  readonly baseURL = environment.serverUrl+"reset_password";
    
  
  constructor(private http: HttpClient) {}

  requestPasswordChange(string) {
    let body = {
      email: string
    }
    return this.http.post(this.baseURL,body);
  }

  makePasswordChange(token,password){
    let body = {
      token: token,
      password: password
    }
    return this.http.post(this.baseURL+'/change_password',body);
  }
}
