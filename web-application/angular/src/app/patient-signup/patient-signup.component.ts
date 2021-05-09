import { Component, OnInit } from "@angular/core";
import { HealthcareDialogContent } from "../healthcare-dialog-content/healthcare-dialog-content.component";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
@Component({
  selector: "app-patient-signup",
  templateUrl: "./patient-signup.component.html",
  styleUrls: ["./patient-signup.component.css"],
})
export class PatientSignupComponent implements OnInit {
  constructor(
    private formBuilderService: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(HealthcareDialogContent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  widgets() {
    var ele2 = document.getElementById("card2");
    ele2.style.display = "block";
    var ele1 = document.getElementById("card1");
    ele1.style.display = "none";
  }

  agree() {
    var ele2 = document.getElementById("card3");
    ele2.style.display = "block";
    var ele1 = document.getElementById("card2");
    ele1.style.display = "none";
  }

  finish() {
    var ele2 = document.getElementById("card4");
    ele2.style.display = "block";
    var ele1 = document.getElementById("card3");
    ele1.style.display = "none";
  }
}
