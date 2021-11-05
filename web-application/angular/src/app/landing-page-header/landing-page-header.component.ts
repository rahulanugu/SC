import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "app-landing-page-header",
  templateUrl: "./landing-page-header.component.html",
  styleUrls: ["./landing-page-header.component.css"],
})
export class LandingPageHeaderComponent implements OnInit {
  timedOutCloser: any;

  @ViewChild("menuTrigger1", {static: false}) menuTrigger1: MatMenuTrigger;
  @ViewChild("menuTrigger2", {static: false}) menuTrigger2: MatMenuTrigger;
  @ViewChild("menuTrigger3", {static: false}) menuTrigger3: MatMenuTrigger;
  menuTriggers: MatMenuTrigger[];

  constructor() {}

  ngOnInit() { }

  ngAfterViewInit() {
    this.menuTriggers = [this.menuTrigger1, this.menuTrigger2, this.menuTrigger3];
  }

  mouseEnter(trigger: MatMenuTrigger) {
    this.menuTriggers.forEach((menuTrigger) => {
      if (menuTrigger && menuTrigger !== trigger) {
        menuTrigger.closeMenu();
      }
    });
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger: MatMenuTrigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }
}
