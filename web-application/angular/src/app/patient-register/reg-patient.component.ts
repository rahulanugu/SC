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
      password: "",
      anemia: false,
      asthma:false,
      arthritis: false,
      cancer: false,
      gout: false,
      diabetes: false,
      emotionalDisorder: false,
      epilepsy: false,
      fainting: false,
      gallstones: false,
      heartDisease: false,
      heartAttack: false,
      rheumaticFever: false,
      highBP: false,
      digestiveProblems: false,
      ulcerative: false,
      ulcerDisease: false,
      hepatitis: false,
      kidneyDiseases: false,
      liverDisease: false,
      sleepApnea: false,
      papMachine: false,
      thyroid: false,
      tuberculosis: false,
      venereal: false,
      neurologicalDisorders: false,
      bleedingDisorders: false,
      lungDisease: false,
      emphysema: false,
      drink: " ",
      smoke: " "
    }
  }

  showFirst(){
    document.getElementById("part2").style.visibility="hidden";
    document.getElementById("part3").style.visibility="hidden";
  }

  showSecond(){
    document.getElementById("part1").style.visibility="hidden";
    document.getElementById("part2").style.visibility="visible";
    document.getElementById("part3").style.visibility="hidden";
  }

  showThird(){
    document.getElementById("part1").style.visibility="hidden";
    document.getElementById("part2").style.visibility="hidden";
    document.getElementById("part3").style.visibility="visible";
  }

  // Sumbit step 1/3
  onSubmit1(street:string, city:string, state:string, country:string, zip:string){
      console.log("form 1 sumbitted");
      // Concatenate different parts of address into one string
      var newAddress = `${street}, ${city}, ${state}, ${country} ${zip}`;
      this.patientService.selectedPatient.address = newAddress;
  }

  // Submit step 2/3
  onSubmit2(form : NgForm){
    console.log("form 2 sumbitted");
  }

  // Sumit step 3/3
  // Create new patient in db
  onSubmit3(form : NgForm){
    this.patientService.postPatient(this.patientService.selectedPatient).subscribe((res) => {
      console.log("patient saved successfully");
    });
  }

}
