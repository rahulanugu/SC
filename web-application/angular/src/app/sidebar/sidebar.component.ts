import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

@Component({
    selector: 'sidenav',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css'],
  })

  export class SideBarComponent {
    mobileQuery: MediaQueryList;

    fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);
  
   
  
    private _mobileQueryListener: () => void;
  
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }
  
  }


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */