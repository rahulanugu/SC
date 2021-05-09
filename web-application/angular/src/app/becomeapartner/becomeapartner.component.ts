import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidator } from "../shared/validators/validation";
@Component({
  selector: "app-becomeapartner",
  templateUrl: "./becomeapartner.component.html",
  styleUrls: ["./becomeapartner.component.css"],
})
export class BecomeapartnerComponent implements OnInit {
  constructor(private formBuilderService: FormBuilder) {}

  ngOnInit() {}
  registerForm = this.formBuilderService.group({
    firstName: ["", Validators.required]
  });
}
