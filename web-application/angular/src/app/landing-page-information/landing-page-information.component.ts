import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {ScreenSizeService} from '../shared/screen-size.service'

@Component({
  selector: 'app-landing-page-information',
  templateUrl: './landing-page-information.component.html',
  styleUrls: ['./landing-page-information.component.css']
})
export class LandingPageInformationComponent implements OnInit {

  private mediaSub: Subscription = new Subscription();
  screenSize:string
  // It will get info from api (rn is just hardcoded)
  display={
    layout:"row"
  }
  card=[
    {cardImage:"../../assets/icons/artificial-intelligence.png",cardTitle:"Artificial Intelligence",cardContects:"Using deep learning models to help consolidate and make actionable outcomes using patient medical data.",  colSpan:1,rowSpan:3},
    {cardImage:"../../assets/icons/healthcare.png",cardTitle:"Preventive Healthcare",cardContects:"Covering the first half of quality healthcare which is to prevent and lower the risk of heart disease.",  colSpan:1,rowSpan:3},
    {cardImage:"../../assets/icons/secure-folder.png",cardTitle:"Data Security",cardContects:"We know that your medical data is important so we've made sure that we make data security a top priority.",  colSpan:1,rowSpan:3},
    {cardImage:"../../assets/icons/computer.png",cardTitle:"Data Accuracy",cardContects:"Being able to track and trace all your inputs into the system with log information easily available.",  colSpan:1,rowSpan:3}
  ]
  constructor(
    private size:ScreenSizeService,
    private mediaObserver: MediaObserver) {

  }
//[cardNr:1,cardImage:"https://cdn-icons-png.flaticon.com/512/7364/7364272.png",cardTitle:"Artificial Intelligence",cardContects:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animiobcaecati facilis molestias perferendis quae iste nihil minus",  colSpan:1,rowSpan:3],

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>
      {
        this.screenSize =this.size.getSize()
        console.log(this.size.getSize())
        this.checkSize()
      }
    );

  }
  checkSize(){
    if(this.screenSize=="sm"){
      this.display={
        layout:"colomn"
      }
    }
  }
  whitePaper(){
    window.open('../../assets/pdf/whitepaper.pdf')
  }
}
