import { LoginPatientService } from './../shared/login-patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VerificationService } from '../shared/verification.service';

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
    private patientService: VerificationService) { }

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
    this._patientloginservice.Loginpatient(this.patientmodel).subscribe(

      res => {
        console.log(res)
        localStorage.setItem('token',res.idToken)
        localStorage.setItem('fname',res.fname)
        this._router.navigate(['patient-profile'])
        
      },
      err => {
        console.log(err);
        document.querySelector('#password').classList.add('is-invalid');
        document.querySelector('#email').classList.add('is-invalid');
        document.querySelector('#invalidsignin').classList.remove('d-none');    
      }
    );
  }

}
