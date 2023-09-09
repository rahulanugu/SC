import { RequestaccessnewuserService } from "../shared/requestaccessnewuser.service";
import { IdService } from "../shared/id.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrNotificationService } from "../toastr-notification.service";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-request-access",
  templateUrl: "./request-access.component.html",
  styleUrls: ["./request-access.component.css"],
})

export class RequestAccessComponent implements OnInit {

  constructor(
    public requestaccessservice: RequestaccessnewuserService,
    private router: Router,
    private toastr: ToastrNotificationService,
    private idservice: IdService
  ) {
    this.requestaccessservice.user = {
      Id: "",
      fname: "",
      lname: "",
      email: "",
      typeOfUser: "",
    };
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  requestAccess() {
    this.requestaccessservice.user.Id = this.idservice.generate();
    this.requestaccessservice.sendMessage(this.requestaccessservice.user).subscribe(
      data => console.log('data', data)
    );
    this.toastr.successToast("Request sent", "Request Access");
    this.router.navigate(['/', 'home']);
    // setTimeout(() => {this.router.navigate(['/', 'home'])}, 3000);
  }
}
