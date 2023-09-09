import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
/**
 * Http calls for contactus page
 */
@Injectable({
  providedIn: "root"
})
export class AdvisorService {

  url="https://localhost:3000/advisor/advisoraccess"
  constructor(private http: HttpClient) {}
  fetchAdvisors(){
    return this.http.get<any>(this.url)
  }
  getAdvisor(Id){
    console.log(Id);
    let getAdvisorUrl=`https://localhost:3000/advisor/getAdvisor/${Id}`
    return this.http.get<any>(getAdvisorUrl)
  }
}