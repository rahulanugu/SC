import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing-who-we-are",
  templateUrl: "./landing-who-we-are.component.html",
  styleUrls: ["./landing-who-we-are.component.css"],
})
export class LandingWhoWeAreComponent implements OnInit {
  // founder:{
  //   icon:string,
  //   name:string,
  //   text:string,
  //   credentials:string
  // }[]=[
  //   {icon:"../../assets/headshots/Headshot (2).jpg",name:"Full Name",text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi amet corporis quis iure nihil ducimus tempora, veritatis cumque deserunt quod! Autem nostrum placeat molestias necessitatibus dolorum. Earum excepturi animi odio.",credentials:"CS"},
  // ]

  teamMembers: {
    id: number;
    icon: string;
    name: string;
    title: string;
  }[] = [
    {
      id: 1,
      icon: "../../assets/headshots/Moh Noori.png",
      name: "Moh Noori",
      title: "Founder/ CEO of ScriptChain Health",
    },
    {
      id: 2,
      icon: "../../assets/headshots/Tejvir Saggu.png",
      name: "Tejvir Saggu",
      title: "Software Developer",
    },
    {
      id: 3,
      icon: "../../assets/headshots/Denis Hallvaxhiu.png",
      name: "Denis Hallvaxhiu",
      title: "Software Developer",
    },
    {
      id: 4,
      icon: "../../assets/headshots/Kefan Xu.png",
      name: "Kefan Xu",
      title: "Software Developer",
    },
    {
      id: 5,
      icon: "../../assets/headshots/Charan Jagwani.png",
      name: "Charan Jagwani",
      title: "Software Developer",
    },
    {
      id: 6,
      icon: "../../assets/headshots/Vincent Fang.png",
      name: "Vincent Fang",
      title: "Machine Learning Engineer",
    },
    {
      id: 7,
      icon: "../../assets/headshots/Rohith Nair.png",
      name: "Rohith Nair",
      title: "Machine Learning Engineer",
    },
    {
      id: 8,
      icon: "../../assets/headshots/Roger Chang.png",
      name: "Roger Chang",
      title: "Machine Learning Engineer",
    },
    {
      id: 9,
      icon: "../../assets/headshots/Anubhav Sharma.png",
      name: "Anubhav Sharma",
      title: "Machine Learning Engineer",
    },
    {
      id: 10,
      icon: "../../assets/headshots/Kate Chan.png",
      name: "Kate Chan",
      title: "Product Designer",
    },
    {
      id: 11,
      icon: "../../assets/headshots/Saachi Jain.png",
      name: "Saachi Jain",
      title: "Business Analyst",
    },
    {
      id: 12,
      icon: "../../assets/headshots/Yuelin Liu.png",
      name: "Yuelin Liu",
      title: "Machine Learning Engineer",
    },
  ];
  advisors: {
    id:number
    icon: string;
    name: string;
    title: string;
  }[] = [
    {
      id:13,
      icon: "../../assets/headshots/Dr. Denmark.png",
      name: "Dr. Denmark",
      title: "Medical Advisor",
    },
    {
      id:14,
      icon: "../../assets/headshots/Dr. Ruff.png",
      name: "Dr. Ruff",
      title: "Medical Advisor",
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  viewEmployee(teamMemberId) {
    this.router.navigate(["/employees", teamMemberId]),
      {
        queryParams: {},
      };
  }
}
