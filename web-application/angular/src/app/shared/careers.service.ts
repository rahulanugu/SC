import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { environment } from 'src/environments/environment';
import { jobOpening } from '../careers/careers.component';
import { jobCategory } from '../job-categories/job-categories.component';

/**
 * Http calls for the careers components
 */
@Injectable({
  providedIn: 'root'
})
export class CareersService {
    readonly baseURL = environment.serverUrl+"careers";
  
    constructor(private http: HttpClient) {}
  
    getAvailableJobOpeningsByCategory(category) {
      return this.http.get<jobOpening[]>(this.baseURL+`/jobposting/${category}`);
    }

    getJobDetails(jobid){
      console.log(this.baseURL+`/jobposting/${jobid}`);
      return this.http.get<jobOpening>(this.baseURL+`/jobposting/job/${jobid}`);
    }

    postJobApplication(jobApplicationData){
      return this.http.post(this.baseURL+`/jobapplication`,jobApplicationData);
    }

    getJobCategories(){
      return this.http.get<jobCategory[]>(this.baseURL+"/jobcategory");
    }
}
