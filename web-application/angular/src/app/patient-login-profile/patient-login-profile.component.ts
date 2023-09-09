/*
Author: Yichen Huang
Desciption: This is the component for the patient login profile page. 
It will display the patient's profile information after the patient logs in.
*/
import { Component, OnInit } from '@angular/core';
import { LoginPatientService } from "../shared/login-patient.service";
import { PatientportalService } from '../shared/patientportal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-login-profile',
  templateUrl: './patient-login-profile.component.html',
  styleUrls: ['./patient-login-profile.component.css']
})


export class PatientLoginProfileComponent implements OnInit {
  

  constructor(
    private LoginPatientService: LoginPatientService,
    private PatientportalService: PatientportalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.parseToken();
  }
    parseToken(){//Update by Yichen Huangin 07/06/2023, parse token and get patient info
      console.log(localStorage.getItem("token"));
      this.LoginPatientService.loggedIn().then((response) => {
      console.log(response);
      localStorage.setItem("UserInfo", response["userinfo"]["decryptedResults"])
      localStorage.setItem("fname", response["userinfo"]["decryptedResults"][0].FirstName);
      localStorage.setItem("lname", response["userinfo"]["decryptedResults"][0].LastName);
    }).catch((err) => {
      console.log(err);
      // comment by Yichen since PatientAuthGuard is activated in app-routing.module.ts to do error handling
      // if (err.error.message == "jwt expired"){
      //   document.querySelector("#expAlert").classList.remove("d-none");
      //   document.querySelector("#loginHeading").classList.add("d-none");
      //   document.querySelector("#imageButton").classList.add("d-none");
      //   setTimeout(() => {
      //   this.router.navigate(['patient/login']);
      //   }, 3000);
      // }
      // else{
      // document.querySelector("#errorAlert").classList.remove("d-none");
      // document.querySelector("#loginHeading").classList.add("d-none");
      // document.querySelector("#imageButton").classList.add("d-none");
      // }
    });
      
  }
  getFnameFromLocalStorage() {
    return this.LoginPatientService.getFname();
  }
}