import { Component, OnInit, Input } from '@angular/core';
import { CareersService } from '../shared/careers.service';
import { Router } from '@angular/router';
import { jobOpening } from '../careers/careers.component';

/**
 * Component: Retrieves and displays the list of job openings in a job category
 */
@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.css']
})
export class JobOpeningsComponent implements OnInit {

  @Input() data: string;

  constructor(
    private service : CareersService,
    private router: Router
    ) { }

  jobOpenings: jobOpening[];

  ngOnInit() {
    this.refreshJobOpeningList();
  }

  

  refreshJobOpeningList(){
    this.service.getAvailableJobOpeningsByCategory(this.data).subscribe(
      res => {
        this.jobOpenings = res;
        console.log(res);
      },
      err => {
        //TODO: Redirect to an error has occured trying to process your request page
      }
    );
  }
  
  applyToJob(id){
    this.router.navigate(['apply-job',id]);
  }
}
