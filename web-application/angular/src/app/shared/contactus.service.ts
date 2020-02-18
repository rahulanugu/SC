import { environment } from "./../../environments/environment";
import { contactus } from "./contactus.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ContactusService {
  contact: contactus;
  readonly baseURL = environment.serverUrl + "contact_us";

  constructor(private http: HttpClient) {}
  sendMessage(contactUserData) {
    console.log(this.baseURL);
    return this.http.post(this.baseURL, contactUserData);
  }
}
