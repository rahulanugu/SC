import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page-demo-header',
  templateUrl: './landing-page-demo-header.component.html',
  styleUrls: ['./landing-page-demo-header.component.css']
})
export class LandingPageDemoHeaderComponent implements OnInit {

    private mediaSub: Subscription = new Subscription();

    constructor(
      private cdRef: ChangeDetectorRef,
      private mediaObserver: MediaObserver
    ) {}

    ngOnInit() {
      this.mediaSub = this.mediaObserver.media$.subscribe(
        (change: MediaChange) => {
          console.log(change.mqAlias);
          console.log(change);
        }
      );
    }
    pass() {}
  }
