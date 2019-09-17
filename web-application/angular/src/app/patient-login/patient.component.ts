import { LoginPatientService } from './../shared/login-patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { Router } from '@angular/router';
import { from } from 'rxjs';
/**
 * Login form for patient users
 */
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['../app.component.css']
})
export class PatientComponent implements OnInit {
  
  patientmodel = new Patient();
  constructor(private _patientloginservice:LoginPatientService,
    private _router:Router) { }

  ngOnInit() {
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
