import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing-capability-statement",
  templateUrl: "./landing-capability-statement.component.html",
  styleUrls: ["./landing-capability-statement.component.css"],
})
export class LandingCapabilityStatementComponent implements OnInit {
  constructor() {}
  cards_3: {
    icon: string;
    title: string;
    paragraph: string;
    list: {list_element}[]
  }[] = [
    {
      icon: "../../assets/head-icon.svg",
      title: "Core Capabilities",
      paragraph: "Our machine learning engineers form algorithms, as well as design and implement solutions in the areas of:",
      list: [{list_element:"Predictive Analytics"},{list_element:"Data Integration / Transfer"},{list_element:"Better Patient Outcomes"},{list_element:"Optimize the Point of Care"}]
    },
    {
      icon: "../../assets/head-icon.svg",
      title: "Core Capabilities",
      paragraph: "Our machine learning engineers form algorithms, as well as design and implement solutions in the areas of:",
      list: [{list_element:"Predictive Analytics"},{list_element:"Data Integration / Transfer"},{list_element:"Better Patient Outcomes"},{list_element:"Optimize the Point of Care"}]
    },
    {
      icon: "../../assets/head-icon.svg",
      title: "Core Capabilities",
      paragraph: "Our machine learning engineers form algorithms, as well as design and implement solutions in the areas of:",
      list: [{list_element:"Predictive Analytics"},{list_element:"Data Integration / Transfer"},{list_element:"Better Patient Outcomes"},{list_element:"Optimize the Point of Care"}]
    }
  ];
  ngOnInit() {}
}
