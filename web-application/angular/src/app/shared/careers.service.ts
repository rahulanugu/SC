import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
      return this.http.get<jobOpening[]>(this.baseURL+`/jobposting/${category}`+environment.param);
    }

    getJobDetails(jobid){
      //console.log(this.baseURL+`/jobposting/job/${jobid}`+environment.param);
      return this.http.get<jobOpening>(this.baseURL+`/jobposting/job/${jobid}`+environment.param);
    }

    postJobApplication(jobApplicationData){
      return this.http.post(this.baseURL+`/jobapplication`+environment.param,jobApplicationData);
    }

    getJobCategories(){
      return this.http.get<jobCategory[]>(this.baseURL+"/jobcategory"+environment.param);
    }
}
