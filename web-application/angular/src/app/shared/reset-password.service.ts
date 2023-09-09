import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

// Siheng - Fixed the requestPasswordChangeForHealthcare and makePasswordChangeForHealthcare functions to suitable for the backend

/**
 * http calls for the reset password components
 */
@Injectable({
  providedIn: "root",
})
export class ResetPasswordService {
  readonly baseURL = environment.serverUrl + "/reset_password";
  readonly baseUrlHealthcare =
    environment.serverUrl + "/backend/healthcare/reset_password";

  constructor(private http: HttpClient) {}

  requestPasswordChange(string) {
    let body = {
      email: string,
    };
    return this.http.post(this.baseURL + environment.param, body);
  }

  makePasswordChange(token, password) {
    console.log("token being sent to backend is" + token);
    let body = {
      token: token,
      password: password,
    };
    return this.http.patch(
      this.baseURL + "/change_password" + environment.param,
      body
    );
  }

  requestPasswordChangeForHealthcare(string) {
    let body = {
      email: string,
    };
    console.log(this.baseUrlHealthcare + environment.param);
    return this.http.post(this.baseUrlHealthcare + environment.param, body);
  }

  makePasswordChangeForHealthcare(token, password) {
    let body = {
      token: token,
      password: password,
    };
    return this.http.patch(
      this.baseUrlHealthcare + "/change_password" + environment.param,
      body
    );
  }
}
