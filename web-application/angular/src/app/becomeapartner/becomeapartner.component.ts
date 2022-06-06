import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
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
      Validators.pattern("[a-zA-Z]*"),
    ]),
    job: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    company_name: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    buisness_type: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    company_adr: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    city: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    state: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    zipCode: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
    country: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z]*"),
    ]),
  });
  constructor(private formBuilderService: FormBuilder) {}

  ngOnInit() {}

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
