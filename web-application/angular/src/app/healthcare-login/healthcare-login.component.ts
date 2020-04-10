import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HealthcareLoginService } from '../shared/healthcare-login.service';
import { Router } from '@angular/router';

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
        console.log(res)
        localStorage.setItem('token',res["idToken"])
         localStorage.setItem('fname',res["firstName"])
        this.router.navigate(['healthcare-profile'])
      },
      err => {
        console.log(err)
        document.querySelector('#password').classList.add('is-invalid');
        document.querySelector('#emailAddress').classList.add('is-invalid');
        document.querySelector('#invalidsignin').classList.remove('d-none');  
      }
    )

  }

}
