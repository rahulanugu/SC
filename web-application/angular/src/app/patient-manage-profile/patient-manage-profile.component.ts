import { Component, OnInit } from '@angular/core';
import { PatientEditService } from '../shared/patient-edit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-manage-profile',
  templateUrl: './patient-manage-profile.component.html',
  styleUrls: ['./patient-manage-profile.component.css']
})
export class PatientManageProfileComponent implements OnInit {

  email:string;
  oldPassword:string ='';
  newPassword: string = '';
  reNewPassword: string = '';
  errorVisible: boolean = false;
  visible:boolean = true;
  wrongPassword:boolean = false;
  passwordsMatch: boolean = true;
  token: string = '';
  passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*]).{6,20}";
  
  couldNotDeactivate: boolean = false;
  constructor(
    private patientEditService: PatientEditService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmission(){
    console.log("trying to submit")
    if(!(this.newPassword === this.reNewPassword)){
      console.log("reentered passwords dont match")
      this.passwordsMatch = false;

      this.visible=true;
      this.wrongPassword=false;
      this.errorVisible=false;
    }else {
      this.passwordsMatch = true;
      this.visible=true;
      this.wrongPassword=false;
      this.errorVisible=false;


      var patientDetails = {
        email: localStorage.getItem('email'),
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }
      this.patientEditService.changePassword(patientDetails).subscribe(
        response => {
          console.log("Response is recieved")
          this.visible = false;
          this.passwordsMatch = true;
          this.wrongPassword=false;
          this.errorVisible=false;

        },
        error => {
          if(error.status === 401){
            this.wrongPassword = true;

            this.passwordsMatch = true;
            this.visible=true;
            this.errorVisible=false;
          }
          if(error.status === 500){
            this.errorVisible = true;

            this.passwordsMatch = true;
            this.visible=true;
            this.wrongPassword=false;

          }
        }
      );        
    }
  }

  deactivateUser(){
    console.log("attempting to deactivate the user")
    var patientDetails = {
      email: localStorage.getItem('email')
    }
    this.patientEditService.deactivateAccount(patientDetails).subscribe(
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
