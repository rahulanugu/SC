import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientEditService } from '../shared/patient-edit.service';

@Component({
  selector: 'app-reactivate-patient',
  templateUrl: './reactivate-patient.component.html',
  styleUrls: ['./reactivate-patient.component.css']
})
export class ReactivatePatientComponent implements OnInit {

  patientmodel = new Patient();
  constructor(
    private activatedRoute: ActivatedRoute,
    private _router:Router,

    private patientEditService: PatientEditService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(!params.token){
        this._router.navigate(['error500'])
      } else this.reactivateUser(params.token);
    })
  }

  reactivateUser(userToken){
    console.log("reactivateuser() invoked")
    const patientdetails = {
      token : userToken
    }
    this.patientEditService.reactivateAccount(patientdetails).subscribe(
      response => {
        console.log("successfully reactivated the account");
      },

      error => {
        console.log(error)
        console.log("An error occured trying to reactivate")
        this._router.navigate(['error500'])
      }
    );
  }

  reRouteToLogin(){
    this._router.navigate(['patientlogin'])
  }

}
