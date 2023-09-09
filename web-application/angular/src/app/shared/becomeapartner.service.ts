/* Daniel - wrote this file modeled after contactus.service.ts */

import { environment } from "../../environments/environment";
import { becomeapartner } from "./becomeapartner.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
/**
 * Http calls for contactus page
 */
@Injectable({
  providedIn: "root"
})
export class BecomeapartnerService {

  bap: becomeapartner;
  constructor(private http: HttpClient) {}
  readonly baseURL = environment.serverUrl + "/partners/email" + environment.param;
  sendMessage(partnerData) {
    console.log(this.baseURL);
    return this.http.post(this.baseURL, partnerData);
  }

  // url="https://dev.scriptchain.co/contact_us/email"
  // sendEmail(email){
  //   return this.http.post<any>(this.url,email)
  // }
}