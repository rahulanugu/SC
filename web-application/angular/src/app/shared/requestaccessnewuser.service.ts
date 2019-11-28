import { RequestAccessUser } from "./requestaccess.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class RequestaccessnewuserService {
  readonly baseURL = environment.serverUrl+"request_access";
  user: RequestAccessUser;

  constructor(private http: HttpClient) {}

  requestAccessforNewUser(user: RequestAccessUser) {
    return this.http.post(this.baseURL, user);
  }
}
