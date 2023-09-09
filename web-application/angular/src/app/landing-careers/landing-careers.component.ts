import { Component, OnInit } from '@angular/core';

export class jobOpening {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public salary: string,
    public location: string,
    public email: string,
    public link: string
  ) { }
}

@Component({
  selector: 'app-landing-careers',
  templateUrl: './landing-careers.component.html',
  styleUrls: ['./landing-careers.component.css']
})
export class LandingCareersComponent implements OnInit {

  constructor() { }
  description = "Our team is looking for top-notch employees who love listening to our customers, working as a team, and proactively taking the lead whenever necessary. Our mission is to innovate and build scalable and robust solutions that deliver a great customer experience.";
  //list of jobs posted in the database
  joblist1 = [{ "ID": "1", "title": "Job Title1", "description": this.description, "location": "Location" }, { "ID": "2", "title": "Job Title2", "description": this.description, "location": "Location" }, { "ID": "3", "title": "Job Title3", "description": this.description, "location": "Location" }];
  joblist2 = [{ "ID": "4", "title": "Job Title4", "description": this.description, "location": "Location" }, { "ID": "5", "title": "Job Title5", "description": this.description, "location": "Location" }];
  jobOpenings = [{ "category": "Software Development", "joblist": this.joblist1 }, { "category": "Desgin", "joblist": this.joblist2 }];

  ngOnInit() {
  }

}
