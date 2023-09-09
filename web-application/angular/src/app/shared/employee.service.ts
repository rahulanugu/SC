import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
/**
 * Http calls for contactus page
 */
@Injectable({
  providedIn: "root"
})
export class EmployService {

  //url="http://database-1.ceurbeaohous.us-east-2.rds.amazonaws.com:3000/employ/dbaccess"
  url="https://scriptchain.co/employ/dbaccess"

  constructor(private http: HttpClient) {}
  fetchEmployees(){
    return this.http.get<any>(this.url)
  }

  fetchAdvisors(){

    let advisorUrl="https://scriptchain.co/employ/advisoraccess"
    return this.http.get<any>(advisorUrl)
  }

  getEmployee(Id){

    let getEmployeeUrl=`https://scriptchain.co/employ/getEmployee/${Id}`
    return this.http.get<any>(getEmployeeUrl)
  }
  getAdvisor(Id){
    let getAdvisorUrl=`https://scriptchain.co/employ/getAdvisor/${Id}`

    return this.http.get<any>(getAdvisorUrl)
  }
}
