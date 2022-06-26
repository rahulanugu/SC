import { Component, OnInit } from '@angular/core';

/**
 * Page: Careers page
 * Description: Displays the job catagories for the user to choose from
 * Users can click on drop downs of the job categories to see job openings that belong
 * to that category
 */
// Kefan - Developed the entire page, the data is hard-coded

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
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  constructor() { }
  description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, architecto aut cum explicabo et animi vitae commodi quam quaerat? Magni, itaque beatae impedit est placeat quidem a rem omnis ratione?";
  //list of jobs posted in the database
  joblist1 = [{ "title": "Job Title1", "description": this.description, "location": "Location" }, { "title": "Job Title2", "description": this.description, "location": "Location" }, { "title": "Job Title3", "description": this.description, "location": "Location" }];
  joblist2 = [{ "title": "Job Title4", "description": this.description, "location": "Location" }, { "title": "Job Title5", "description": this.description, "location": "Location" }];
  jobOpenings = [{ "category": "Software Development", "joblist": this.joblist1 }, { "category": "Desgin", "joblist": this.joblist2 }];

  ngOnInit() {
  }
}
