import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-healthcare-profile',
  templateUrl: './healthcare-profile.component.html',
  styleUrls: ['./healthcare-profile.component.css']
})
export class HealthcareProfileComponent implements OnInit {

  allPatients: Patient[]
  filteredPatients: Patient[]
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe(posts => {
      this.allPatients = posts
      this.dataService.postsData = posts
    });
  }

  onSelectedOption(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0)
      {this.allPatients = this.dataService.filteredListOptions();
      this.filteredPatients = this.allPatients;}
    else {
      this.allPatients = this.dataService.postsData;
    }

    console.log(this.allPatients)
  }

  openPatientProfile(patientId){
    console.log("patientId being rtried to access is "+patientId)
    this.router.navigate(["healthcare-profile/patient/",patientId]);
  }
}
