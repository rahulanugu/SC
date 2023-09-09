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


  constructor(private http: HttpClient) {}

  fetchAdvisors(){
    let advisorUrl="http://localhost:3000/employ/advisoraccess"
    return this.http.get<any>(advisorUrl)
  }

  getAdvisor(Id){
    let getAdvisorUrl=`https://localhost:3000/employ/getAdvisor/${Id}`
    return this.http.get<any>(getAdvisorUrl)
  }
}