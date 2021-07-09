import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-who-we-are',
  templateUrl: './landing-who-we-are.component.html',
  styleUrls: ['./landing-who-we-are.component.css']
})
export class LandingWhoWeAreComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  jobOpenings() {
    // this.router.navigate(['/job-openings']);
  }

}
