import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  breakpoint: number;
  constructor() { }

  ngOnInit() {
    //console.log(window.innerWidth);
    if(window.innerWidth > 800){
      this.breakpoint = 4;
    }
    else if(window.innerWidth >= 640){
      this.breakpoint = 2;
    }else{
      this.breakpoint = 1;
    }
    //console.log(this.breakpoint);
  }

  onResize(event) {
    //this.breakpoint = (event.target.innerWidth <= 800) ? 2 : 4;
    if(event.target.innerWidth> 800){
      this.breakpoint = 4;
    }
    else if(event.target.innerWidth >= 640){
      this.breakpoint = 2;
    }else{
      this.breakpoint = 1;
    }
  }
}
