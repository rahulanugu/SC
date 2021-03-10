import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-healthcare-add-user',
  templateUrl: './healthcare-add-user.component.html',
  styleUrls: ['./healthcare-add-user.component.css']
})
export class HealthcareAddUserComponent implements OnInit {

  constructor(private formBuilderService: FormBuilder) { }
  Form = this.formBuilderService.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required],
    employer: ["", Validators.required]
  });

  ngOnInit() {
  }

  showPatient(){
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
  }
}
