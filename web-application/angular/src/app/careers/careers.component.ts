import { Component, OnInit } from '@angular/core';

export class jobOpening{
  constructor(
    public _id: string,
    public title:string,
    public description:string,
    public salary:number,
    public location:string,
    public email:string,
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
