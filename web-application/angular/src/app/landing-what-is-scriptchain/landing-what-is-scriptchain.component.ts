import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-landing-what-is-scriptchain",
  templateUrl: "./landing-what-is-scriptchain.component.html",
  styleUrls: ["./landing-what-is-scriptchain.component.css"],
})
export class LandingWhatIsScriptchainComponent implements OnInit {

    constructor() {}
  // Array of object that will hold the data (or retrive from database)
  dataInfo: {
    icon: string;
    title: string;
    info: string;
    isCollapsed: boolean;
  }[] = [
    {
      icon: "../../assets/icons/cloud-service.svg",
      title: "HIPAA & HITECH",
      info: "We are a cloud application that is HIPAA compliant and HITECH compliant.",
      isCollapsed: true,
    },
    {
      icon: "../../assets/icons/encrypted.svg",
      title: "Data Security",
      info: "We know that your medical data is important so we've made sure that we make data security a top priority.",
      isCollapsed: true,
    },
    {
      icon: "../../assets/icons/book.svg",
      title: "American College of Cardiology",
      info: "We follow the American College of Cardiology guidelines on how AI algorithms are developed.",
      isCollapsed: true,
    },
    {
      icon: "../../assets/icons/analysis.svg",
      title: "Data Accuracy",
      info: "Being able to track and trace all your inputs into the system with log information easily accessible.",
      isCollapsed: true,
    }
    ,
    {
      icon: "../../assets/icons/diagnosis.svg",
      title: "Plug-in Platform",
      info: "ScriptChain integrates with EMR systems like EPIC systems, Athenahealth, Cerner, Allscripts, and soon to be eClinical.",
      isCollapsed: true,
    }
    ,
    {
      icon: "../../assets/icons/artificial-intelligence.svg",
      title: "Artificial Intelligence",
      info: "Using deep learning models to reduce the mortality rate for cardiovascular disease and decrease the costs of readmission for healthcare institutions.",
      isCollapsed: true,
    }
    ,
    {
      icon: ".../../assets/icons/clock.svg",
      title: "Time Savings",
      info: "We significantly reduce the amount of time spent reviewing medical data and make more time for patient care.",
      isCollapsed: true,
    }
    ,
    {
      icon: "../../assets/icons/heart.svg",
      title: "Preventative Healthcare",
      info: "Covering the first half of quality healthcare which is to prevent and lower the risk of heart disease.",
      isCollapsed: true,
    }
  ];
  ngOnInit() {
  }
}
