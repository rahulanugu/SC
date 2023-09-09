import { AfterViewInit, ViewChild } from "@angular/core";
import { QueryList } from "@angular/core";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { ScreenSizeService } from "../shared/screen-size.service";
import { filter } from "rxjs-compat/operator/filter";

@Component({
  selector: "app-landing-page-information",
  templateUrl: "./landing-page-information.component.html",
  styleUrls: ["./landing-page-information.component.css"],
})
export class LandingPageInformationComponent implements OnInit, AfterViewInit {
  @ViewChild("video", { static: false }) video: ElementRef;

  observer: any;

  private mediaSub: Subscription = new Subscription();
  screenSize: string;
  // It will get info from api (rn is just hardcoded)
  display = {
    layout: "row",
  };
  card = [
    {
      cardImage: "../../assets/icons/artificial-intelligence.png",
      cardTitle: "Artificial Intelligence",
      cardContects:
        "With the use of Novel Algorithms by integrating Federated Learning with GNNs, we are able to improve accuracy using multiple different devices and improve security in real time.",
      colSpan: 1,
      rowSpan: 3,
    },
    {
      cardImage: "../../assets/icons/healthcare.png",
      cardTitle: "Preventive Healthcare",
      cardContects:
        "Covering the first half of medicine which is Value Based Care that can better patient outcomes and reduce the strain on physicians",
      colSpan: 1,
      rowSpan: 3,
    },
    {
      cardImage: "../../assets/icons/secure-folder.png",
      cardTitle: "Data Security",
      cardContects:
        "With end to end encryption through our cloud native application, we want to ensure our customers that we follow HIPAA and HITECH compliance requirements",
      colSpan: 1,
      rowSpan: 3,
    },
    {
      cardImage: "../../assets/icons/computer.png",
      cardTitle: "Data Accuracy",
      cardContects:
        "By integrating directly into EMR systems and mobiles devices, we make predictions for your health based off your specific medical history",
      colSpan: 1,
      rowSpan: 3,
    },
  ];

  constructor(
    private size: ScreenSizeService,
    private mediaObserver: MediaObserver
  ) {}

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.screenSize = this.size.getSize();
        this.checkSize();
      }
    );
  }
  // Checks if the landing page is in view
  ngAfterViewInit() {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    try {
      let observer = new IntersectionObserver(
        this.observerCallback.bind(this),
        options
      );
      observer.observe(this.video.nativeElement);
    } catch (error){
      console.log(error)
    }
  }

  checkSize() {
    if (this.screenSize == "sm") {
      this.display = {
        layout: "colomn",
      };
    }
  }
  whitePaper() {
    window.open("../../assets/pdf/whitepaper.pdf");
  }

  observerCallback(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      // if the screen is in view of the film
      // else if it is not
      if (entry.isIntersecting) {
        this.video.nativeElement.play();
        this.video.nativeElement.volume = 0.3;
      } else {
        this.video.nativeElement.volume = 0.2;
        // Delete this
        // this.video.nativeElement.pause()
      }
    }
  }
}
