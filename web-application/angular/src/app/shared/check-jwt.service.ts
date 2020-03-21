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
    
  
    constructor(private http: HttpClient) {}
  
    verifyJwtStatus(string) {
      return this.http.get(this.baseURL+'/'+string);
    }
  
}
