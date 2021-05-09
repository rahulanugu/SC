import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../shared/patient.service';
@Component({
  selector: 'app-healthcare-add-user',
  templateUrl: './healthcare-add-user.component.html',
  styleUrls: ['./healthcare-add-user.component.css']
})
export class HealthcareAddUserComponent implements OnInit {
  constructor(
    private formBuilderService: FormBuilder,
    private patientService: PatientService,
  ){}
  patient: boolean;
  caregiver: boolean;
  ngOnInit() {
    this.patient = true
    this.caregiver = false
  }

  Form = this.formBuilderService.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required]
  });
  Form1 = this.formBuilderService.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required],
    employer: ["", Validators.required]
  });

  showPatient(){
    this.patient = true
    this.caregiver = false
    var elem2 = document.getElementById('patient');
    elem2.style.display = "block";
    var elem1 = document.getElementById('caregiver');
    elem1.style.display = "none";
    var button1 = document.getElementById('Caregiverbtn');
    button1.classList.remove("mystyle");
    var button2 = document.getElementById('patientBtn');
    button2.classList.add("mystyle");
  }

  showCaregiver(){
    this.caregiver = true
    this.patient = false
    var elem2 = document.getElementById('patient');
    elem2.style.display = "none";
    var elem1 = document.getElementById('caregiver');
    elem1.style.display = "block";
    var button1 = document.getElementById('Caregiverbtn');
    button1.classList.add("mystyle");
    var button2 = document.getElementById('patientBtn');
    button2.classList.remove("mystyle");
  }

  widgets(){
    var ele2 = document.getElementById('card2');
    ele2.style.display = "block";
    var ele1 = document.getElementById('card1');
    ele1.style.display = "none";
  }
  signup(){
    var ele2 = document.getElementById('card3');
    ele2.style.display = "block";
    var ele1 = document.getElementById('card2');
    ele1.style.display = "none";
  }
  finish(){
    var ele2 = document.getElementById('card4');
    ele2.style.display = "block";
    var ele1 = document.getElementById('card3');
    ele1.style.display = "none";
    if(this.patient){
      console.log(this.Form.value.firstName);
      this.patientService.postPatientNew(this.Form.value)
      .subscribe(
        (res) => {
          console.log(res);
        },(err)=>{
          console.log(err);
        })
      }
      else if(this.caregiver){
        console.log(this.Form1.value.employer);
        this.patientService.postCaregiver(this.Form1.value)
        .subscribe(
          (res) => {
            console.log(res);
          },(err)=>{
            console.log(err);
          })
        }
      }
  }