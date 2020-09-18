import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HealthcareLoginService } from '../shared/healthcare-login.service';
import { Router } from '@angular/router';
import { HealthcareEditService } from '../shared/healthcare-edit.service';

/**
 * Page: Login page for heatlhcare providers
 */
export class HealthcareLoginDetails{
  //datamodel for sending username and password to backend
  username: string;
  password: string;
}
 @Component({
  selector: 'app-healthcare-login',
  templateUrl: './healthcare-login.component.html',
  styleUrls: ['../app.component.css']
})
export class HealthcareLoginComponent implements OnInit {
 
  healthcareLoginDetails = new HealthcareLoginDetails();
  
  constructor(
    private formBuilderService: FormBuilder,
    private healthcareLoginService: HealthcareLoginService,
    private healthcareEditService: HealthcareEditService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  Form = this.formBuilderService .group({
    emailAddress: ["", Validators.required],
    password: ["", Validators.required]
  });

  onSubmit(){
    console.log(this.Form.value);
    this.healthcareLoginService.healthcareProviderLogin(this.Form.value).subscribe(
      res => {
        //console.log(res)
        localStorage.setItem('token',res["idToken"])
        localStorage.setItem('fname',res["firstName"])
        localStorage.setItem('email', this.Form.value.emailAddress)
        window.location.href = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Fscriptchain.co%2Fhealthcare-profile&client_id=f0439b63-30ad-4103-8bb5-b58da64693c7"
        
        //this.router.navigate(['healthcare-profile'])
      },
      err => {
        //console.log(err)
        //console.log("Error is")
        //console.log(err)
        if(err.status == 401){
          document.querySelector('#emailAddress').classList.remove('is-invalid');
          document.querySelector('#invalidEmailPrompt').classList.add('d-none');    
          document.querySelector('#password').classList.add('is-invalid');
          document.querySelector('#invalidPasswordPrompt').classList.remove('d-none');    
          document.querySelector('#deactivatedEmail').classList.add('d-none');


        }else if(err.status == 303){
          //console.log("deactivated email handling")
          //send a reactivare mail
          this.healthcareEditService.makeReactivateRequest({email : this.Form.value.emailAddress}).subscribe(
            response => {
              //console.log("response is recieved")
              document.querySelector('#deactivatedEmail').classList.remove('d-none');
            },
            error => {
              //console.log("error is recieved")
              this.router.navigate['error500']
            }
          );
        } else {
          //console.log("errorcode")
          document.querySelector('#invalidPasswordPrompt').classList.add('d-none');    
          document.querySelector('#emailAddress').classList.add('is-invalid');
          document.querySelector('#password').classList.add('is-invalid');
          document.querySelector('#invalidEmailPrompt').classList.remove('d-none');    
          document.querySelector('#deactivatedEmail').classList.add('d-none');

        }
      }
    )

  }

}
