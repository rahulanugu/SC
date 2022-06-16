import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from "@angular/core";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "app-landing-page-header",
  templateUrl: "./landing-page-header.component.html",
  styleUrls: ["./landing-page-header.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageHeaderComponent implements OnInit {

  isActive=false
  constructor() {}

  ngOnInit() { }

  search(){
    this.isActive=!this.isActive
  }
}
