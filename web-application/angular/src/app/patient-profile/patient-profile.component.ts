import { LoginPatientService } from '../shared/login-patient.service';
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
    document.getElementById('firstname').innerHTML = "<span class='text'><h4>"+localStorage.getItem('fname')+"</h4></span><br>\
    <span class='text'><b>Medical Record No.(MRN): </b>YTK12345678</span><br><span class='text'><b>Phone Number: </b>(123)456-7890</span>";
    document.getElementById('dob').innerHTML = "<span class='text'><b>DOB: </b>07/16/1970</span><br>\
    <span class='text'><b>Email Address: </b>Leslie.Wang@gmail.com</span>";
    document.getElementById('sex').innerHTML = "<span class='text'><b>Sex: </b>Female</span><br>\
    <span class='text'><b>Pronoun: </b>She/Her</span><br><span class='text'><b>Place: </b>Boston/MA</span>";
  }
  logout(){
    this._loginPatientService.logOutPatient();
  }

}
