import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
/**
 * Http calls for checking the validity of jwt tokens
 */
@Injectable({
  providedIn: 'root'
})
export class CheckJwtService {
  
    readonly baseURL = environment.serverUrl+"reset_password/check";
    readonly baseUrlHealthcare = environment.serverUrl + "backend/healthcare/reset_password/check"

    
  
    constructor(private http: HttpClient) {}
  
    verifyJwtStatus(str) {
      const reqBody = {
        "token": str
      }
      return this.http.post(this.baseURL,reqBody);
    }

    verifyJwtStatusForHealthcare(str) {
      const reqBody = {
        "token": str
      }
      return this.http.post(this.baseUrlHealthcare,reqBody);
    }
  
}
