import { LoginPatientService } from './../shared/login-patient.service';
import { Component, OnInit } from '@angular/core';

/**
 * Patient profile home page
 * path parameter: patient id
 */
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(private _loginPatientService:LoginPatientService) { }

  ngOnInit() {
    document.getElementById('firstname').innerHTML = "<b>Welcome "+localStorage.getItem('fname')+",</b>";
  }
  logout(){
    this._loginPatientService.logOutPatient();
  }

}
