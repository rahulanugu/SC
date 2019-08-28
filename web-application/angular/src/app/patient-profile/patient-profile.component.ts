import { LoginPatientService } from './../shared/login-patient.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(private _loginPatientService:LoginPatientService) { }

  ngOnInit() {
  }
  logout(){
    this._loginPatientService.logOutPatient();
  }

}
