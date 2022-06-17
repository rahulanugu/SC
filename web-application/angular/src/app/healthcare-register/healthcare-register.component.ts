import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
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
  passwordNotMatch: boolean = false;
  userAlreadyExist: boolean = false;
  constructor(
    private formBuilderService: FormBuilder,
    private healthCareAccountService: HealthcareAccountService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
<<<<<<< HEAD

=======
    //document.getElementById("registersuccessful").style.display = "none";
>>>>>>> dda28ebcf7156adb0e7302af4a22661643a97720
  }
  openDialog() {
    const dialogRef = this.dialog.open(HealthcareDialogContent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  pattern1 = "^[0-9_-]{10,12}";

<<<<<<< HEAD
  Form = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    orgName: new FormControl("", [Validators.required]),
    orgPosition: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required,CustomValidator.phoneValidator,]),
    ReTypePassword: new FormControl("", [Validators.required]),

=======
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
>>>>>>> dda28ebcf7156adb0e7302af4a22661643a97720
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
  get firstName() {
    return this.Form.get("firstName");
  }
  get lastName() {
    return this.Form.get("lastName");
  }
  get email() {
    return this.Form.get("email");
  }
  get phone() {
    return this.Form.get("phone");
  }
  get orgName() {
    return this.Form.get("orgName");
  }
  get orgPosition() {
    return this.Form.get("orgPosition");
  }
  get ReTypePassword() {
    return this.Form.get("ReTypePassword");
  }
  get password() {
    return this.Form.get("password");
  }

}
