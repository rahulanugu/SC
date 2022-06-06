import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page-carousel',
  templateUrl: './landing-page-carousel.component.html',
  styleUrls: ['./landing-page-carousel.component.css']
})
export class LandingPageCarouselComponent implements OnInit {

  constructor() { }
  // Header title
  header:string="What are our users saying"
  // Holds cards info to be called in html
  cards:{icon:string;doctor:string;title:string;text:string}[]=[
    {icon:"../../assets/icons/round blue people avatar.png",doctor:"Dr. Mody",title:"Professor of Medicine",text:"If we had a tool to help point out high risk patient so we can intervene and prevent illnesses, that would be very beneficial for everyone involved."},
    {icon:"../../assets/icons/round blue people avatar.png",doctor:"Dr. Beahr",title:"Retired Cardiologist",text:"AI is something that makes sense out of chaos. It connects the dots."},
    {icon:"../../assets/icons/round blue people avatar.png",doctor:"Nicole Lincoln",title:"Head of Nursing Innovation",text:"Medicine in the US is pretty reactive and not preventative which is a problem."},
    {icon:"../../assets/icons/round blue people avatar.png",doctor:"Dr. Denmark",title:"Cardiologist",text:"Artificial Intelligence has the potential to improve our current healthcare system by increasing speed, efficiency, and effectiveness allowing physicians to provide more accurate and up to date care to our patients while speeding up workflow and improving patient outcomes."}
  ]
  ngOnInit() {
  }

}
