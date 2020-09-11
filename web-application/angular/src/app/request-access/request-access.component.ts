import { RequestaccessnewuserService } from "../shared/requestaccessnewuser.service";

import { Component, OnInit } from "@angular/core";

/**
 * Page: Request demo form for propspective clients
 */
@Component({
  selector: "app-request-access",
  templateUrl: "./request-access.component.html",
  styleUrls: ["../app.component.css"]
})
export class RequestAccessComponent implements OnInit {
  constructor(public requestaccessservice: RequestaccessnewuserService) {
    this.requestaccessservice.user = {
      _id: "",
      fname: "",
      lname: "",
      email: "",
      typeOfUser: ""
    };
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    document.getElementById("requestAccessSuccess").style.display = "none";
    document.getElementById("userexistalready").style.display = "none";
  }
  requestAccess() {
    this.requestaccessservice
      .requestAccessforNewUser(this.requestaccessservice.user)
      .subscribe(
        res => {
          if(res['message'].includes("registered")){
            document.getElementById("userexistalready").style.display = "block";
            window.scrollTo(0, 0);
          }else{
            document.getElementById("rform").remove();
            document.getElementById("userexistalready").style.display = "none";
            document.getElementById("requestAccessSuccess").style.display =
              "block";
            window.scrollTo(0, 0);
          }
        },
        err => {
          document.getElementById("userexistalready").style.display = "block";
          window.scrollTo(0, 0);
        }
      );
  }
}
