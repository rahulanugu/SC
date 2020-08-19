import { Component, OnInit } from '@angular/core';
import { HealthcareEditService } from '../shared/healthcare-edit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-healthcare-manage-profile',
  templateUrl: './healthcare-manage-profile.component.html',
  styleUrls: ['./healthcare-manage-profile.component.css']
})
export class HealthcareManageProfileComponent implements OnInit {
  couldNotDeactivate: boolean = false;
  email:string;


  constructor(
   private healthcareEditService: HealthcareEditService,
   private router: Router
  ) { }

  ngOnInit() {
  }

  deactivateUser(){
    //console.log("attempting to deactivate the user")
    var patientDetails = {
      email: localStorage.getItem('email')
    }
    this.healthcareEditService.deactivateAccount(patientDetails).subscribe(
      response => {
        localStorage.removeItem('token');
        localStorage.removeItem('fname');
        this.email = localStorage.getItem('email');
        localStorage.removeItem('email');
        this.router.navigate(['deactivatedpatient'],{ queryParams: { email: this.email } });      
      },
      error => {
        this.couldNotDeactivate = true;
      }
    );
  }

}
