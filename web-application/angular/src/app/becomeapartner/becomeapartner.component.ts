import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidator } from "../shared/validators/validation";
@Component({
  selector: "app-becomeapartner",
  templateUrl: "./becomeapartner.component.html",
  styleUrls: ["./becomeapartner.component.css"],
})
export class BecomeapartnerComponent implements OnInit {
  registerForm: FormGroup;
  submitted: false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, CustomValidator.phoneValidator]],
      companyName: ["", Validators.required],
      message: ["", Validators.required],
    });
  }
}
