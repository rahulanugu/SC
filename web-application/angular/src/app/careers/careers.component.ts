import { Component, OnInit } from '@angular/core';

/**
 * Page: Careers page
 * Description: Displays the job catagories for the user to choose from
 * Users can click on drop downs of the job categories to see job openings that belong
 * to that category
 */
export class jobOpening{
  constructor(
    public _id: string,
    public title:string,
    public description:string,
    public salary:string,
    public location:string,
    public email:string,
    public link:string
  ){}
}

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  constructor() { }

  //list of jobs posted in the database
  jobOpenings: jobOpening[]

  ngOnInit() {
  }
}
