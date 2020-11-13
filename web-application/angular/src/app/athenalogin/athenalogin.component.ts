import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HealthcareLoginService } from '../shared/healthcare-login.service';
import { Router } from '@angular/router';
import { HealthcareEditService } from '../shared/healthcare-edit.service';

/**
 * Page: Login page for heatlhcare providers
 */
export class AthenaLoginDetails{
  //datamodel for sending username and password to backend
  username: string;
  password: string;
}
 @Component({
  selector: 'app-healthcare-login',
  templateUrl: './athenalogin.component.html',
  styleUrls: ['../app.component.css']
})
export class AthenaLoginComponent implements OnInit {
 
  healthcareLoginDetails = new AthenaLoginDetails();
  
  constructor(
    private formBuilderService: FormBuilder,
    private healthcareLoginService: HealthcareLoginService,
    private healthcareEditService: HealthcareEditService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  Form = this.formBuilderService .group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  onSubmit(){
    console.log(this.Form.value);
    this.healthcareLoginService.healthcareProviderLogin(this.Form.value).subscribe(
      res => {
        //console.log("test");
        localStorage.setItem('token',res["idToken"])
        localStorage.setItem('fname',res["firstName"])
        localStorage.setItem('username', this.Form.value.username)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NHA2ZGtrOWVteDhjYnU2aGhxamJ4cmFqOlB2aFp2bkVzZzZyQWNOdw==");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          // redirect: 'follow',
          observe: 'redirect' as 'redirect'
        };
        
        fetch("https://api.athenahealth.com/oauthpreview/token", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        //this.router.navigate(['healthcare-profile'])
      },
      err => {
        console.log(err)
        //console.log("Error is")
        //console.log(err)
        if(err.status == 401){
      
          document.querySelector('#password').classList.add('is-invalid');
          document.querySelector('#invalidPasswordPrompt').classList.remove('d-none');    
          document.querySelector('#deactivatedusername').classList.add('d-none');


        }else if(err.status == 303){
          //console.log("deactivated username handling")
          //send a reactivare mail
          this.healthcareEditService.makeReactivateRequest({username : this.Form.value.username}).subscribe(
            response => {
              //console.log("response is recieved")
              document.querySelector('#deactivatedusername').classList.remove('d-none');
            },
            error => {
              //console.log("error is recieved")
              this.router.navigate['error500']
            }
          );
        } else {
          //console.log("errorcode")
          document.querySelector('#invalidPasswordPrompt').classList.add('d-none');    
          document.querySelector('#username').classList.add('is-invalid');
          document.querySelector('#password').classList.add('is-invalid');
          document.querySelector('#invalidusernamePrompt').classList.remove('d-none');    
          document.querySelector('#deactivatedusername').classList.add('d-none');

        }
      }
    )

  }

}
