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
  job : jobOpening;

  constructor(
    private route: ActivatedRoute,
    private service: CareersService,
  ) { }

  ngOnInit() {
    //console.log(this.route.snapshot.params['jobid']);
    this.loadScript();
    this.service.getJobDetails(this.route.snapshot.params['jobid']).subscribe(
      response => {
        //console.log(response);
        this.job = response;
      },
      error => {
        //TODO: Redirect to a page not found error page
      }
    );
  }

  loadScript() {
    var script = document.createElement('script');
    script.src = "app/apply-job/script.js"
    script.type = 'text/javascript'
    document.getElementsByTagName('head')[0].appendChild(script);
  }

}
