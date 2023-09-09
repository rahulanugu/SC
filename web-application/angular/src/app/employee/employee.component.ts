import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdvisorService } from "../shared/advisor.service";
import { EmployService } from "../shared/employee.service";

//Charan Jagwani: connects to advisor or employee function based on what object is created
@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {

  teamMembers: [];
  employer: any;
  employerId:any
  constructor(private router: Router,
    private employeeService: EmployService,
    private advisorService: AdvisorService,
    private route: ActivatedRoute
) {
}

  ngOnInit() {
    this.employer= this.route.snapshot.paramMap.get('employee');
    this.employerId= this.route.snapshot.paramMap.get('id');
    console.log(this.employer)
    console.log(this.employerId)
    if(this.employer=="employee"){
      this.employeeService.getEmployee(this.employerId).subscribe((data)=>{
        console.log(data)
        this.teamMembers=data
      })
    }else if(this.employer=="advisor"){
      this.employeeService.getAdvisor(this.employerId).subscribe((data)=>{
        console.log(data)
        this.teamMembers=data
      })
    }
  }
}