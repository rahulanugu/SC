import { Component, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";
@Component({
  selector: "app-landing-page-subfooter",
  templateUrl: "./landing-page-subfooter.component.html",
  styleUrls: ["./landing-page-subfooter.component.css"],
})
export class LandingPageSubfooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    if (window.innerWidth < 1000) {
      var el: HTMLElement = document.getElementById("contactId");
      el.classList.add("col-sm-12");
      el.classList.remove("col-sm-5");
    }
    if (window.innerWidth >= 1000) {
      var el: HTMLElement = document.getElementById("contactId");
      el.classList.add("col-sm-5");
      el.classList.remove("col-sm-12");
    }
  }

  onResize(event) {
    if (event.target.innerWidth < 1000) {
      var el: HTMLElement = document.getElementById("contactId");
      el.classList.add("col-sm-12");
      el.classList.remove("col-sm-5");
    }

    if (event.target.innerWidth >= 1000) {
      var el: HTMLElement = document.getElementById("contactId");
      el.classList.add("col-sm-5");
      el.classList.remove("col-sm-12");
    }
  }
}
