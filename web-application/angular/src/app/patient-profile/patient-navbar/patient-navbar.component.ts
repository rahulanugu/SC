import { PatientDataService } from "./../patient-data.service";
import { Component, OnInit } from "@angular/core";
import { LoginPatientService } from "./../../shared/login-patient.service";

@Component({
  selector: "app-patient-navbar",
  templateUrl: "./patient-navbar.component.html",
  styleUrls: ["./patient-navbar.component.css"]
})
export class PatientNavbarComponent implements OnInit {
  constructor(
    private _PatientDataService: PatientDataService,
    private _loginPatientService: LoginPatientService
  ) {}

  ngOnInit() {}
  logout() {
    this._loginPatientService.logOutPatient();
  }
}
