import { Component, OnInit } from '@angular/core';
import { jobOpening } from '../careers/careers.component';
import { ActivatedRoute } from '@angular/router';
import { CareersService } from '../shared/careers.service';

/**
 * Page: specific job page
 */
@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  job : jobOpening

  constructor(
    private route: ActivatedRoute,
    private service: CareersService
  ) { }

  ngOnInit() {
    this.service.getJobDetails(this.route.snapshot.params['jobid']).subscribe(
      response => {
        this.job = response;
      },
      error => {
        //TODO: Redirect to a page not found error page
      }
    )
  }

}
