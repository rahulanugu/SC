import { LoginPatientService } from "../shared/login-patient.service";
import { PatientEditService } from "../shared/patient-edit.service";
import { Patient } from "../shared/patient.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { param } from "jquery";
import { ToastrNotificationService } from "../toastr-notification.service";

/**
 * Page: Login form for patient users
 */
export class PatientLoginDetails {//modify by Yichen, add a new class for patient login
  //datamodel for sending username and password to backend
  username: string;
  password: string;
}
@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"],
})
export class PatientComponent implements OnInit {
  patientLoginDetails = new PatientLoginDetails();//modify by Yichen
  constructor(
    private formBuilderService: FormBuilder,
    private LoginPatientService: LoginPatientService,
    private toastr: ToastrNotificationService,
    private patientEditService: PatientEditService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit() {//add by Yichen, just for debugging
    //BharatChadalawada: validate email token and redirect to login portal
    this.activatedRoute.queryParamMap.subscribe(params =>{
      let verify_token = params.get('verify')
      console.log("Veify Toekn",verify_token);
      if (verify_token != null){
        verify_token = verify_token.replace(" ",'+')
        let tokentObj = {token : decodeURIComponent(verify_token.replace(/\s/g,'+'))}
        this.LoginPatientService.verifyPatientEmail(tokentObj).subscribe( res=>{
          if(res){
            this.toastr.successToast("Email Veified successfully", "Email Verified");
            this.router.navigate(['patient/login']);
          }
        });
      }
    })

  }

  Form = this.formBuilderService.group({
    emailAddress: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    this.LoginPatientService.cleanLocalStorage(); //modify by Yichen, clean all info in local storage every time user login
     //console.log(this.Form.value);
    this.LoginPatientService.Loginpatient(this.Form.value).subscribe(
      (res) => {
        //Update by Yichen Huang, store jwt token and user type in local storage
        localStorage.setItem("token", res["jwtToken"]);
        localStorage.setItem("caregiver", res["caregiver"]);
        console.log(res);
        if (res["caregiver"]== true) {//Update by Yichen, add caregiver login
          this.router.navigate(['patients/caregiverprofile']);
        }
        else{
        this.router.navigate(['patients/profile']);
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 401) {
          document
            .querySelector("#emailAddress")
            .classList.remove("is-invalid");
          document.querySelector("#invalidEmailPrompt").classList.add("d-none");
          document.querySelector("#password").classList.add("is-invalid");
          document
            .querySelector("#invalidPasswordPrompt")
            .classList.remove("d-none");
          document.querySelector("#deactivatedEmail").classList.add("d-none");
        } else if (err.status == 303) {
          //console.log("deactivated email handling")
          //send a reactivare mail
          this.patientEditService
            .makeReactivateRequest({ email: this.Form.value.emailAddress })
            .subscribe(
              (response) => {
                //console.log("response is recieved")
                document
                  .querySelector("#deactivatedEmail")
                  .classList.remove("d-none");
              },
              (error) => {
                //console.log("error is recieved")
              }
            );
        } else {
          //console.log("errorcode")
          document
            .querySelector("#invalidPasswordPrompt")
            .classList.add("d-none");
          document.querySelector("#emailAddress").classList.add("is-invalid");
          document.querySelector("#password").classList.add("is-invalid");
          document
            .querySelector("#invalidEmailPrompt")
            .classList.remove("d-none");
        }
      }
    );
  }
}