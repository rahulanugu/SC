import { Component, OnInit } from '@angular/core';
import { CareersService } from '../shared/careers.service';
import { Router } from '@angular/router';

/**
 * Component: Retrievies and displays a list of job categories
 */
export class jobCategory{
  constructor(
    public _id: string,
    public title:string,
    public description:string,
    public bool: false
  ){}
}

@Component({
  selector: 'app-job-categories',
  templateUrl: './job-categories.component.html',
  styleUrls: ['./job-categories.component.css']
})
export class JobCategoriesComponent implements OnInit {

  constructor(
    private service : CareersService,
    private router : Router
  ) { }

  panelExpanded = false;

  clickedCategory(id){
    //console.log("id: "+id);
  }
  jobCategories: jobCategory[];

  ngOnInit() {
    this.refreshJobCategoryList();
  }
  

  refreshJobCategoryList(){
    this.service.getJobCategories().subscribe(
      res => {
        this.jobCategories = res;
        //console.log(res);
      },
      err => {
        this.router.navigate(['/name']);
      }
    );
  }
}
