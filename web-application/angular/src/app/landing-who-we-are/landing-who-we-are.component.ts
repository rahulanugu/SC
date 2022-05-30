import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-who-we-are',
  templateUrl: './landing-who-we-are.component.html',
  styleUrls: ['./landing-who-we-are.component.css']
})
export class LandingWhoWeAreComponent implements OnInit {

  teamMembers:{
    icon:string,
    name:string,
    title:string,
    credentials:string
  }[]=[
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"}
  ]
  advisors:{
    icon:string,
    name:string,
    title:string,
    credentials:string
  }[]=[
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/Avatar1.png",name:"Full Name",title:"title",credentials:"CS"}
  ]
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
