import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PatientportalService {
  constructor(private httpClient: HttpClient) {}

  // private url = "http://localhost:3000/backend/healthcare/provider-portal";
  private baseURL = environment.serverUrl + "/backend/healthcare/add-user";
  private getUserURL = environment.serverUrl + "/backend/healthcare/add-user/getuser";
  

  getUsers() {
    return this.httpClient.get(`${this.baseURL}`);
  }
  addUsers(data, params) {
    // return this.httpClient.post(`${this.baseURL}`, data);
    return this.httpClient.post(`${this.baseURL}${params}`, data);
  }

  getUserByEmail(email) {//By Yichen: get user by email
    return this.httpClient.get(`${this.getUserURL}?email=${email}`);
  }
}
