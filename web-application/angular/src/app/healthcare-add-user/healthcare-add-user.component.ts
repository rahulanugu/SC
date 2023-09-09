import { PatientportalService } from "../shared/patientportal.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
// DenisH Rework
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-healthcare-add-user",
  templateUrl: "./healthcare-add-user.component.html",
  styleUrls: ["./healthcare-add-user.component.css"],
})
export class HealthcareAddUserComponent implements OnInit {
  patient: boolean;

  progressBar = 0;
  form: any;
  user: any = "patient";
  cargiver: any = "relative";
  addForm: FormGroup;
  allInfo = {};
  //DenisH List that holds all the widgets for the front end
  //DenisH id,name,checkSelected are required for all
  //DenisH options and optionSelected come together, options hold array of elements that we want user to select while optionSelected if we want a default
  widgetList = [
    {
      id: 1,
      name: "Readmission",
      checkSelected: true,
      options: ["All Conditions", "Worker", "Employee", "3", "4"],
      optionSelected: "All Conditions",
    },
    {
      id: 2,
      name: "Condition",
      checkSelected: true,
      options: ["All Conditions", "5", "6", "7", "8"],
      optionSelected: "All Conditions",
    },
    { id: 3, name: "Patient Info", checkSelected: true },
    { id: 4, name: "Medications", checkSelected: true },
    { id: 5, name: "Labs", checkSelected: true },
    { id: 6, name: "Vitals", checkSelected: true },
    { id: 7, name: "Diagnoses", checkSelected: true },
    { id: 8, name: "Procedures", checkSelected: true },
  ];
  // DenisH creates a formbuilder
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private patientPortalService: PatientportalService
  ) {
    this.addForm = this.formBuilder.group({
      fName: ["", Validators.required],
      lName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      employer: "",
    });
  }
  get name() {
    return this.addForm.get("fName");
  }
  get lName() {
    return this.addForm.get("lName");
  }
  get email() {
    return this.addForm.get("email");
  }
  get phone() {
    return this.addForm.get("phone");
  }
  ngOnInit() {}
  //DenisH Switches the progress bar and calls switch screen
  next() {
    if (this.progressBar < 3) {
      this.progressBar = this.progressBar + 1;
    }
    this.switchSceen(this.progressBar);
  }
  //DenisH Switches the progress bar and calls switch screen
  back() {
    if (this.progressBar > 0) {
      this.progressBar = this.progressBar - 1;
    }
    this.switchSceen(this.progressBar);
  }
  // DenisH Gets user value
  userChangeHandler(event: any) {
    this.user = event.target.value;
  }
  //DenisH Gets cargiver value
  cargiverChangeHandler(event: any) {
    this.cargiver = event.target.value;
  }

  //DenisH Switches the screen/with display none to everything but block to the one we need
  switchSceen(progress) {
    var card1 = document.getElementById("card1");
    var card2 = document.getElementById("card2");
    var card3 = document.getElementById("card3");
    var card4 = document.getElementById("card4");
    card1.style.display = "none";
    card2.style.display = "none";
    card3.style.display = "none";
    card4.style.display = "none";
    if (progress == 0) card1.style.display = "block";
    else if (progress == 1) card2.style.display = "block";
    else if (progress == 2) card3.style.display = "block";
    else if (progress == 3) card4.style.display = "block";
    if (progress == 3) {
    document.getElementById("email").style.display = "none";
    document.getElementById("sms").style.display = "none";
    const emailChecked = document.getElementById("emailChecked")["checked"];
    const smsChecked = document.getElementById("smsChecked")["checked"];
    if (emailChecked) document.getElementById("email").style.display = "block";
    if (smsChecked) document.getElementById("sms").style.display = "block";
    }
  }
  //DenisH After done it sends the user to the healthace patientportal
  navigate() {
    this.router.navigateByUrl("/healthcare/patientportal");
  }
  displayAllInfo() {
    // DenisH Stores all the needed information in allInfo and then subcribe to a service to post the info to db
    this.allInfo = {
      UserType: this.user,
      FirstName: this.addForm.value.fName,
      LastName: this.addForm.value.lName,
      Email: this.addForm.value.email,
      Phone: this.addForm.value.phone,
      Readmission: this.widgetList[0].checkSelected,
      UserCondition: this.widgetList[1].checkSelected,
      PatientInfo: this.widgetList[2].checkSelected,
      Medication: this.widgetList[3].checkSelected,
      Labs: this.widgetList[4].checkSelected,
      Vitals: this.widgetList[5].checkSelected,
      Diagnosis: this.widgetList[6].checkSelected,
      Procedures: this.widgetList[7].checkSelected,
      Employer: this.addForm.value.employer,
      PatientRelation: this.cargiver,
      ReadmissionType: this.widgetList[0].optionSelected,
      UserConditionType: this.widgetList[1].optionSelected,
    };
    // this.patientPortalService.addUsers(this.allInfo).subscribe((result)=>{
    //   console.log("Succsess")
    // })
    // call this.patientPortalService.addUsers and add ?emailChecked=true to the url
    // this.patientPortalService
    //   .addUsers(this.allInfo, "?emailChecked=true")
    //   .subscribe((result) => {
    //     console.log("Succsess");
    //   });
    // this.navigate();
    const emailChecked = document.getElementById("emailChecked")["checked"];
    const smsChecked = document.getElementById("smsChecked")["checked"];
    this.patientPortalService
      .addUsers(
        this.allInfo,
        "?emailChecked=" + emailChecked + "&smsChecked=" + smsChecked
      )
      .subscribe((result) => {
        console.log("Succsess");
      });
  }
}
