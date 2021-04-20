import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthcareAccountService } from '../shared/healthcare-account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HealthcareLoginService } from "../shared/healthcare-login.service";
import { HealthcareEditService } from "../shared/healthcare-edit.service";

/**
 * Page: Healthcare provider account verification page
 * Queryparameter: AES encryptedJWT token for verfication
 * Description: Users can access this page from the verification email of the account they recieve
 * upon registration 
 */
@Component({
  selector: 'app-healthcare-verify',
  templateUrl: './healthcare-verify.component.html',
  styleUrls: ['./healthcare-verify.component.css']
})
export class HealthcareVerifyComponent implements OnInit {

  token:string;
  
  constructor(
    private route: ActivatedRoute,
    private healthcareAccountService: HealthcareAccountService,
    private router: Router,
    private healthcareLoginService: HealthcareLoginService,
    private healthcareEditService: HealthcareEditService,
    private formBuilderService: FormBuilder
    ) { }
  Form = this.formBuilderService.group({
    emailAddress: ["", Validators.required],
    password: ["", Validators.required],
  });

  ngOnInit() {
    document.getElementById('verificationerror').style.display = "none";
    document.getElementById('verificationsuccessful').style.display = "none";

    window.scrollTo(0,0);

    //verify the token and display the components accordingly
    this.route.queryParams.subscribe(params=>{
      this.token=params.verifytoken;
      if(this.token){
        //console.log(this.token)
        this.healthcareAccountService.verifyTokenAndCreateAccount(this.token).subscribe(
          res=>{
            document.getElementById('verificationerror').style.display = "none";
            document.getElementById('verificationsuccessful').style.display = "block";
            window.location.hash = "verificationsuccessful";
          },
          err=> {
            document.getElementById('verificationsuccessful').style.display = "none";
            document.getElementById('verificationerror').style.display = "block";
            window.location.hash = "verificationerror";
          }
        );
      }else{
        document.getElementById('verificationsuccessful').style.display = "none";
        document.getElementById('verificationerror').style.display = "block";
        window.location.hash = "verificationerror";
        //console.log('no data');
      }
    })
    
    
  }
  reRouteToLogin(){
    this.router.navigate(['/healthcare/login']);
  }
  onSubmit() {
    console.log(this.Form.value);
    this.healthcareLoginService
      .healthcareProviderLogin(this.Form.value)
      .subscribe(
        (res) => {
          //console.log("test");
          localStorage.setItem("token", res["idToken"]);
          localStorage.setItem("fname", res["firstName"]);
          localStorage.setItem("email", this.Form.value.emailAddress);
          window.location.href = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Fwww.scriptchain.co%2Fhealthcare-profile&client_id=84af87de-1a34-4336-9139-3b59c9c032a5";

          //window.location.href = "https://applescm184region.open.allscripts.com/authorization/connect/authorize?response_type=code&state&client_id=b5362fb7-a608-415f-aba9-fae232fce90e&scope=launch user/*.read&redirect_uri=https://www.scriptchain.co/healthcare-profile"
          //james
          //Password#1
          //this.router.navigate(['healthcare-profile'])
        },
        (err) => {
          console.log(err);
          //console.log("Error is")
          //console.log(err)
          if (err.status == 401) {
            document
              .querySelector("#emailAddress")
              .classList.remove("is-invalid");
            document
              .querySelector("#invalidEmailPrompt")
              .classList.add("d-none");
            document.querySelector("#password").classList.add("is-invalid");
            document
              .querySelector("#invalidPasswordPrompt")
              .classList.remove("d-none");
            document.querySelector("#deactivatedEmail").classList.add("d-none");
          } else if (err.status == 303) {
            //console.log("deactivated email handling")
            //send a reactivare mail
            this.healthcareEditService
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
                  this.router.navigate["error500"];
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
            document.querySelector("#deactivatedEmail").classList.add("d-none");
          }
        }
      );
  }
}
