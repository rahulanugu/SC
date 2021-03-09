import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material';
import { HealthcareDialogContent } from "../healthcare-dialog-content/healthcare-dialog-content.component"

@Component({
  selector: "app-healthcare-account-settings",
  templateUrl: "./healthcare-account-settings.component.html",
  styleUrls: ["./healthcare-account-settings.component.css"],
})
export class HealthcareAccountSettingsComponent implements OnInit {
  constructor(private formBuilderService: FormBuilder,
    public dialog: MatDialog) {}

  ngOnInit() {}

  Form = this.formBuilderService.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    companyName: ["", Validators.required],
    ehr: ["", Validators.required],
    roleInCompany: ["", Validators.required],
    password: ["", Validators.required]
  });

  openDialog() {
    const dialogRef = this.dialog.open(HealthcareDialogContent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
