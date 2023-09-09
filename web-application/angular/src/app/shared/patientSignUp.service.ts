import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatientSignUpService {
  private baseURL = '';
  
  constructor(private http: HttpClient) {
    this.baseURL = environment.serverUrl + "/patients/signup";
  }

    create(patientDetails) {
      console.log(this.baseURL);
      console.log('patient', patientDetails);
      return this.http.post(this.baseURL + "/create", patientDetails);
    }
    //BHaratChadalawada: API service call Upload profile image or avatar image
    uploadProfileImage(image): Observable<any> {
      // const formData = new FormData();
      // console.log('append imgs' + image);
      // formData.append('image', image);
      console.log(image);
      return this.http.post(this.baseURL + "/profile-picture", image);
    }

    
    passwordPatternValidator(control: AbstractControl): { [key: string]: any } | null {
      let val = control.value;
  
      if (val === null || val === '') return null;
      if (!val.toString().match(/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,}$/)) return { 'password': true };
  
      return null;
   
    }
}
