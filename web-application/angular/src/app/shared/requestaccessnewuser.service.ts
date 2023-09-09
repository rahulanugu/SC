import { RequestAccessUser } from "./requestaccess.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

/**
 * http calls for the requestaccess component
 */
@Injectable({
  providedIn: "root"
})
export class RequestaccessnewuserService {
  readonly baseURL = environment.serverUrl + "/request_access/sendMail" + environment.param;
  user: RequestAccessUser;

  constructor(private http: HttpClient) {}

  sendMessage(requestAccessData) {
    return this.http.post(this.baseURL, requestAccessData);
  }

  url="https://dev.scriptchain.co/request_access/access"
  sendAccess(access){
    return this.http.post<any>(this.url, access)
  }
}
