import { contactus } from './contactus.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  contact: contactus;
  readonly baseURL = 'http://localhost:3000/contact-us';

  constructor(private http:HttpClient) { }
  sendMessage(contactUserData){
    return this.http.post(this.baseURL, contactUserData);
  }
}
