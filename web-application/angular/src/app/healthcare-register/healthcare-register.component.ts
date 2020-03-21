import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HealthcareAccountService } from '../shared/healthcare-account.service';


/**
 * Page: Registeration page for the healthcare providers
 * Description: Users can create a registration request from this page.
 * Users will recieve an email from which they can verify their account before logging in.
 */
@Component({
  selector: 'app-healthcare-register',
  templateUrl: './healthcare-register.component.html',
  styleUrls: ['../app.component.css']
})
export class HealthcareRegisterComponent implements OnInit {

  passwordNotMatch: boolean = false;
  userAlreadyExist: boolean = false;
  
  constructor(
    private formBuilderService: FormBuilder,
    private healthCareAccountService: HealthcareAccountService
  ) { }

  ngOnInit() {
    document.getElementById('registersuccessful').style.display = "none";
  }

  Form = this.formBuilderService.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    companyName: ["", Validators.required],
    roleInCompany: ["", Validators.required],
    password: ["", Validators.required]
  });
  
  submitForm(){
    this.healthCareAccountService.generateTokenForVerification(this.Form.value).subscribe(
    res=>{
      document.getElementById('registrationForm').style.display = "none";
      document.getElementById('registersuccessful').style.display = "block";
      window.location.hash = "registersuccesful";
    },
    err => {
      //TODO: Redirect to an error component
    });

  }
}
