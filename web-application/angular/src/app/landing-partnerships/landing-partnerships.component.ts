import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing-partnerships",
  templateUrl: "./landing-partnerships.component.html",
  styleUrls: ["./landing-partnerships.component.css"],
})
export class LandingPartnershipsComponent implements OnInit {
  // Siheng: Add the relative path to the images array here if there are more partners
  images = [
    "../../assets/images/partner1.png",
    "../../assets/images/partner2.png",
    "../../assets/images/partner3.png",
  ];

  constructor() {}

  ngOnInit() {}
}
