import { Component, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";
@Component({
  selector: "app-landing-page-subfooter",
  templateUrl: "./landing-page-subfooter.component.html",
  styleUrls: ["./landing-page-subfooter.component.css"],
})
export class LandingPageSubfooterComponent implements OnInit {
  // Siheng: Get current year to display in the footer rather than hardcoding it
  currentYear: number;
  constructor() {}
  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
