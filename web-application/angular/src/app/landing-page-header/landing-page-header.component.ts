import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from "@angular/core";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "app-landing-page-header",
  templateUrl: "./landing-page-header.component.html",
  styleUrls: ["./landing-page-header.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageHeaderComponent implements OnInit {

<<<<<<< HEAD
  isActive=false
  constructor() {}

  ngOnInit() { }

  search(){
    this.isActive=!this.isActive
=======
  isActive = false
  constructor() { }

  ngOnInit() { }

  search() {
    this.isActive = !this.isActive
>>>>>>> dda28ebcf7156adb0e7302af4a22661643a97720
  }
}
