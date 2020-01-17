import { environment } from "./../../environments/environment";
import { contactus } from "./contactus.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ContactusService {
  contact: contactus;
<<<<<<< HEAD
  readonly baseURL = environment.serverUrl+"contact_us";
=======
  readonly baseURL = environment.serverUrl + "contact_us";
>>>>>>> ecdf77b78e0ed001a436cf38802cd9b3ae40ff7a

  constructor(private http: HttpClient) {}
  sendMessage(contactUserData) {
    console.log(this.baseURL);
    return this.http.post(this.baseURL, contactUserData);
  }
}
