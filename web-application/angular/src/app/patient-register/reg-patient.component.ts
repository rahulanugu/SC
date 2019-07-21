import { Component, OnInit } from '@angular/core';

import { PatientService } from '../shared/patient.service';
import { NgForm } from '@angular/forms';
import { formatNumber } from '@angular/common';

/**
 * Register form for patient users
 */
@Component({
  selector: 'app-reg-patient',
  templateUrl: './reg-patient.component.html',
  styleUrls: ['../app.component.css'],
  providers: [PatientService]
})
export class RegPatientComponent implements OnInit {

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.showFirst();
    this.patientService.selectedPatient = {
      _id: "",
      fname: "",
      lname: "",
      address: "",
      phone: "",
      birthday: "",
      sex: "",
      ssn: "",
      allergies: "",
      ec: "",
      ecPhone: "",
      password: ""
    }
  }

  showFirst(){
    document.getElementById("part2").style.visibility="hidden";
    //document.getElementById("part3").style.visibility="hidden";
  }

  showSecond(){
    document.getElementById("part1").style.visibility="hidden";
    document.getElementById("part2").style.visibility="visible";
    //document.getElementById("part3").style.visibility="hidden";
  }

  onSubmit1(form : NgForm){
      console.log("form 1 sumbitted")
  }


  onSumbit2(form : NgForm){
 
  }

  // post patient information to db
  onSubmit2(form : NgForm){
    this.patientService.postPatient(this.patientService.selectedPatient).subscribe((res) => {
      console.log("patient saved successfully")
    });
  }

}
