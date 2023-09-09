import { environment } from "../../environments/environment";
import { contactus } from "./contactus.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
/**
 * Http calls for contactus page
 */
@Injectable({
  providedIn: "root"
})
export class ContactusService {

  contact: contactus;
  readonly baseURL = environment.serverUrl + "/contact_us/sendMail" + environment.param;

  constructor(private http: HttpClient) {}

  sendMessage(contactUserData) {
    console.log('URL : ', this.baseURL);
    return this.http.post(this.baseURL, contactUserData);
  }
 
  // url="https://dev.scriptchain.co/contact_us/email"
  // sendEmail(contactUserData){
  //   return this.http.post<any>(this.url, contactUserData);
  // }
}
