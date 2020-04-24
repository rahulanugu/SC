import { LoginPatientService } from './../shared/login-patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VerificationService } from '../shared/verification.service';
import { PatientEditService } from '../shared/patient-edit.service';

/**
 * Page: Login form for patient users
 */
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['../app.component.css']
})
export class PatientComponent implements OnInit {
  token:string;
  jwtToken: string;

  patientmodel = new Patient();
  constructor(private _patientloginservice:LoginPatientService,
    private _router:Router,
    private activatedRoute: ActivatedRoute,
    private patientService: VerificationService,
    private patientEditService: PatientEditService) { }

  ngOnInit() {
    document.getElementById('verificationsuccessful').style.display = "none";
    console.log("patient component is reached");
    window.scrollTo(0,0);
    this.activatedRoute.queryParams.subscribe(params=>{
      console.log(params);
      this.token=params.verify;
      this.jwtToken= params.verify;
      if(this.token){
        this.onVerified(this.jwtToken);
      }else{
        console.log('no data');
      }
    })
  }
    
      onVerified(token){
        // verification using token and jwt
        this.patientService.postVerifiredToken(token).subscribe(()=>{
          document.getElementById('verificationsuccessful').style.display = "block";
          localStorage.removeItem('user-jwt');
        });
      }
  //check if user exist or not if user exist receive JWT and add to browser's local storage
  onSubmit(){
    console.log("clicked submit")
    this._patientloginservice.Loginpatient(this.patientmodel).subscribe(

      res => {
        console.log(res)
        localStorage.setItem('token',res.idToken)
        localStorage.setItem('fname',res.fname)
        localStorage.setItem('email',res.email)
        this._router.navigate(['patient-profile'])
        
      },
      err => {
        console.log("Error is")
        console.log(err)
        if(err.status == 401){
          document.querySelector('#email').classList.remove('is-invalid');
          document.querySelector('#invalidEmailPrompt').classList.add('d-none');    
          document.querySelector('#password').classList.add('is-invalid');
          document.querySelector('#invalidPasswordPrompt').classList.remove('d-none');    
          document.querySelector('#deactivatedEmail').classList.add('d-none');


        }else if(err.status == 303){
          console.log("deactivated email handling")
          //send a reactivare mail
          this.patientEditService.makeReactivateRequest({email : this.patientmodel.email}).subscribe(
            response => {
              console.log("response is recieved")
              document.querySelector('#deactivatedEmail').classList.remove('d-none');
            },
            error => {
              console.log("error is recieved")
              this._router.navigate['error500']
            }
          );
        } else {
          document.querySelector('#email').classList.add('is-invalid');
          document.querySelector('#password').classList.add('is-invalid');
          document.querySelector('#invalidEmailPrompt').classList.remove('d-none');    
          document.querySelector('#deactivatedEmail').classList.add('d-none');

        }
      }
    );
  }

}
