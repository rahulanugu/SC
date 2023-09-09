//Charan Jagwani: made static data dynamic connected it all through backend services accessing db
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdvisorService } from "../shared/advisor.service";
import { EmployService } from "../shared/employee.service";

@Component({
  selector: "app-landing-who-we-are",
  templateUrl: "./landing-who-we-are.component.html",
  styleUrls: ["./landing-who-we-are.component.css"],
})
export class LandingWhoWeAreComponent implements OnInit {

  teamMembers: [];
  advisors: [];
  constructor(private router: Router,
    private employeeService: EmployService,
    private advisorService: AdvisorService
  ) { }

  ngOnInit() {
    this.getEmployess().then((data: any) => {
      this.teamMembers = data;
      this.fetchAdvisors()
    }).catch((error) => {

    })
  }
  fetchAdvisors() {
    this.employeeService.fetchAdvisors().subscribe((data) => {
      console.log(data)
      this.advisors = data
    })
  }
  viewEmployee(teamMemberId) {
    this.router.navigate(["/employees", teamMemberId]),
    {
      queryParams: {},
    };
  }

  getEmployess() {
    return new Promise((resolve, reject) => {
      this.employeeService.fetchEmployees().subscribe((data) => {
        console.log(data)
        resolve(data);
      },
        (error) => {
          reject(error);
        })
    })
  }

}
