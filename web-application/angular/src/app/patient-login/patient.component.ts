import { LoginPatientService } from './../shared/login-patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VerificationService } from '../shared/verification.service';

/**
 * Login form for patient users
 */
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['../app.component.css']
})
export class PatientComponent implements OnInit {
  token:object;

  patientmodel = new Patient();
  constructor(private _patientloginservice:LoginPatientService,
    private _router:Router,
    private activatedRoute: ActivatedRoute,
    private patientService: VerificationService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.activatedRoute.queryParams.subscribe(params=>{
      this.token=params;
      if(this.token){
        this.onVerified();
      }else{
        console.log('no data');
      }
    })
  }
      //verification using token and jwt
      helperJWT(){
        return localStorage.getItem('user-jwt');
      }
  
      onVerified(){
  
        // verification using token and jwt
        const token = this.helperJWT();
        this.patientService.postVerifiredToken(token).subscribe(()=>{
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
