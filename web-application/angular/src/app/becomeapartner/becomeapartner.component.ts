/* Daniel - added submit functionality to connect to  node backend */

import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrNotificationService } from "../toastr-notification.service";
import { BecomeapartnerService } from "../shared/becomeapartner.service";
import { CustomValidator } from "../shared/validators/validation";


@Component({
  selector: "app-becomeapartner",
  templateUrl: "./becomeapartner.component.html",
  styleUrls: ["./becomeapartner.component.css"],
})
export class BecomeapartnerComponent implements OnInit {
  partnerForm = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.minLength(10)
    ]),
    job: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*"),
    ]),
    company_name: new FormControl("", [
      Validators.required
    ]),
    buisness_type: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*"),
    ]),
    company_adr: new FormControl("", [
      Validators.required
    ]),
    city: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*"),
    ]),
    state: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*"),
    ]),
    zipCode: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.minLength(5),
      Validators.maxLength(5)
    ]),
    country: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*"),
    ]),
  });
  constructor(
    private formBuilderService: FormBuilder,
    private becomeapartnerService: BecomeapartnerService,
    private toastr: ToastrNotificationService,
    private router: Router
  ) {}

  ngOnInit() {}

  partnerModel = {};

  submitForm(){
    this.partnerModel = {
      fname: this.partnerForm.value.firstName,
      lname: this.partnerForm.value.lastName,
      email: this.partnerForm.value.email,
      phone: this.partnerForm.value.phone,
      jobtitle: this.partnerForm.value.job,
      companyname: this.partnerForm.value.company_name,
      companyvertical: this.partnerForm.value.buisness_type,
      companyaddress: this.partnerForm.value.company_adr,
      city: this.partnerForm.value.city,
      state: this.partnerForm.value.state,
      postalcode: this.partnerForm.value.zipCode,
      country: this.partnerForm.value.country,
      message: "test"
    };
    this.becomeapartnerService.sendMessage(this.partnerModel).subscribe(
      data => console.log('Success!!!!!',data),
      error => console.log("Error",error)
    );
    this.router.navigate(["/home"]);
    this.toastr.successToast("A verification email has been sent", "Partnership Request Submitted");
  }

  get firstName() {
    return this.partnerForm.get("firstName");
  }
  get lastName() {
    return this.partnerForm.get("lastName");
  }
  get email() {
    return this.partnerForm.get("email");
  }
  get phone() {
    return this.partnerForm.get("phone");
  }
  get job() {
    return this.partnerForm.get("job");
  }
  get company_name() {
    return this.partnerForm.get("company_name");
  }
  get buisness_type() {
    return this.partnerForm.get("buisness_type");
  }
  get company_adr() {
    return this.partnerForm.get("company_adr");
  }
  get city() {
    return this.partnerForm.get("city");
  }
  get state() {
    return this.partnerForm.get("state");
  }
  get zipCode() {
    return this.partnerForm.get("zipCode");
  }
  get country() {
    return this.partnerForm.get("country");
  }
}
