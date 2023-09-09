import { PatientportalService } from '../shared/patientportal.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-healthcare-patient-portal",
  templateUrl: "./healthcare-patient-portal.component.html",
  styleUrls: ["./healthcare-patient-portal.component.css"],
})
export class HealthcarePatientPortalComponent implements OnInit {
  // Route to the folder for the icons
  imageRoute="../../assets/Avatar/"
  usersTest:any
  constructor(private PatientPortalService:PatientportalService) {}

  ngOnInit() {
    // this.addUsersTest()
    this.getUsersTest();
  }

  getUsersTest(){
    this.PatientPortalService.getUsers().subscribe((response)=>{
      this.usersTest = response
      console.log(this.usersTest)
    })
  }
}
