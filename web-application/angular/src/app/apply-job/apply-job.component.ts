import { Component, OnInit } from "@angular/core";
import { jobOpening } from "../careers/careers.component";
import { ActivatedRoute } from "@angular/router";
import { CareersService } from "../shared/careers.service";
​
/**
 * Page: specific job page
 */
@Component({
  selector: "app-apply-job",
  templateUrl: "./apply-job.component.html",
  styleUrls: ["./apply-job.component.css"],
})
export class ApplyJobComponent implements OnInit {
  job: jobOpening;
​
  jobList: {
    page:number;
    name: string;
    jobDesc: string;
    Responsibilities: string[];
    Requirements: string[];
    posted:string;
  }[]= [
    {page:1,name:"Software Development",jobDesc:"Something to say about the job description",Responsibilities:["Responsibility nr1","Responsibility nr2","Responsibility nr3"],Requirements:["Requirement nr1","Requirement nr2","Requirement nr3"],posted:"06/14/2022"},
    {page:2,name:"Web Development",jobDesc:"Something to say about the job description",Responsibilities:["Responsibility nr4","Responsibility nr5","Responsibility nr6"],Requirements:["Requirement nr4","Requirement nr5","Requirement nr6"],posted:"06/15/2022"},
    {page:3,name:"Software Development",jobDesc:"Something to say about the job description",Responsibilities:["Responsibility nr1","Responsibility nr2","Responsibility nr3"],Requirements:["Requirement nr1","Requirement nr2","Requirement nr3"],posted:"06/16/2022"},
    {page:4,name:"Web Development",jobDesc:"Something to say about the job description",Responsibilities:["Responsibility nr4","Responsibility nr5","Responsibility nr6"],Requirements:["Requirement nr4","Requirement nr5","Requirement nr6"],posted:"06/17/2022"},
    {page:5,name:"Software Development",jobDesc:"Something to say about the job description",Responsibilities:["Responsibility nr1","Responsibility nr2","Responsibility nr3"],Requirements:["Requirement nr1","Requirement nr2","Requirement nr3"],posted:"06/18/2022"},
    {page:6,name:"Web Development",jobDesc:"Something to say about the job description",Responsibilities:["Responsibility nr4","Responsibility nr5","Responsibility nr6"],Requirements:["Requirement nr4","Requirement nr5","Requirement nr6"],posted:"06/19/2022"},
  ];
​
  jobListCount:number=0
​
  constructor(private route: ActivatedRoute, private service: CareersService) {}
​
  ngOnInit() {
  }
  previousPage(){
    if(this.jobListCount!=0){
      this.jobListCount--
      document.documentElement.scrollTo({top:0,behavior:"smooth"});
    }
    console.log(this.jobListCount)
​
  }
  nextPage(){
    if(this.jobListCount!=(this.jobList.length-1)){
      this.jobListCount++
      document.documentElement.scrollTo({top:0,behavior:"smooth"});
    }
    console.log(this.jobListCount)
​
  }
  jumpPage(page){
    this.jobListCount=page-1;
    document.documentElement.scrollTo({top:0,behavior:"smooth"});
  }
}
    //console.log(this.route.snapshot.params['jobid']);
  //   this.loadScript();
  //   this.service.getJobDetails(this.route.snapshot.params["jobid"]).subscribe(
  //     (response) => {
  //       //console.log(response);
  //       this.job = response;
  //     },
  //     (error) => {
  //       //TODO: Redirect to a page not found error page
  //     }
  //   );
  // }
​
  // loadScript() {
  //   var script = document.createElement("script");
  //   script.src = "app/apply-job/script.js";
  //   script.type = "text/javascript";
  //   document.getElementsByTagName("head")[0].appendChild(script);
  // }