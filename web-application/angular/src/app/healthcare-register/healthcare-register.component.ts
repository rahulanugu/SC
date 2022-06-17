import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HealthcareAccountService } from "../shared/healthcare-account.service";
import { Router } from "@angular/router";
import { CustomValidator } from "../shared/validators/validation";
import { MatDialog } from "@angular/material";
import { HealthcareDialogContent } from "../healthcare-dialog-content/healthcare-dialog-content.component";

/**
 * Page: Registeration page for the healthcare providers
 * Description: Users can create a registration request from this page.
 * Users will recieve an email from which they can verify their account before logging in.
 */
@Component({
  selector: "app-healthcare-register",
  templateUrl: "./healthcare-register.component.html",
  styleUrls: ["./healthcare-register.component.css"],
})
export class HealthcareRegisterComponent implements OnInit {
  public phonemask = [
    "(",
    /[0-9]/,
    /\d/,
    /\d/,
    ")",
    "-",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  passwordNotMatch: boolean = false;
  userAlreadyExist: boolean = false;
  constructor(
    private formBuilderService: FormBuilder,
    private healthCareAccountService: HealthcareAccountService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //document.getElementById("registersuccessful").style.display = "none";
  }
  openDialog() {
    const dialogRef = this.dialog.open(HealthcareDialogContent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  pattern1 = "^[0-9_-]{10,12}";

  Form = this.formBuilderService.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    companyName: ["", Validators.required],
    ehr: ["", Validators.required],
    roleInCompany: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required],
    phone: ["", [Validators.required, CustomValidator.phoneValidator]],
  });

  submitForm() {
    this.healthCareAccountService
      .generateTokenForVerification(this.Form.value)
      .subscribe(
        (res) => {
          document.getElementById("registrationForm").style.display = "none";
          document.getElementById("registersuccessful").style.display = "block";
          window.location.hash = "registersuccesful";
        },
        (err) => {
          if (err.status === 400) {
            this.userAlreadyExist = true;
          } else {
            this.router.navigate(["/home"]);
          }
        }
      );
  }
}
