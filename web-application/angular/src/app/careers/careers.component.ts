import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


/**
 * Page: Careers page
 * Description: Displays the job catagories for the user to choose from
 * Users can click on drop downs of the job categories to see job openings that belong
 * to that category
 */
// Kefan - Developed the entire page, the data is hard-coded
//https://angel.co/job_profiles/embed?startup=onyx-6
export class jobOpening {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public salary: string,
    public location: string,
    public email: string,
  ) { }
}
@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }
  description = "Our team is looking for top-notch employees who love listening to our customers, working as a team, and proactively taking the lead whenever necessary. Our mission is to innovate and build scalable and robust solutions that deliver a great customer experience.";
  //list of jobs posted in the database
  joblist1 = [{ "ID": "1", "title": "Job Title1", "description": this.description, "location": "Location" }, { "ID": "2", "title": "Job Title2", "description": this.description, "location": "Location" }, { "ID": "3", "title": "Job Title3", "description": this.description, "location": "Location" }];
  joblist2 = [{ "ID": "4", "title": "Job Title4", "description": this.description, "location": "Location" }, { "ID": "5", "title": "Job Title5", "description": this.description, "location": "Location" }];
  jobOpenings = [{ "category": "Software Development", "joblist": this.joblist1 }, { "category": "Desgin", "joblist": this.joblist2 }];
  //<script data-startup="onyx-6" src="https://angel.co/javascripts/embed_jobs.js" id="angellist_embed" async></script>

  public ngOnInit() {

    let script = this._renderer2.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://angel.co/javascripts/embed_jobs.js";
    script.id = "angellist_embed"
    script.async = true;
    script.charset = 'utf-8';
    this._renderer2.appendChild(this._document.body, script);
  }
}
