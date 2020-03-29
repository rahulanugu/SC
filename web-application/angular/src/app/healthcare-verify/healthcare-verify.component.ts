import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthcareAccountService } from '../shared/healthcare-account.service';

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
    private router: Router
    ) { }

  ngOnInit() {
    document.getElementById('verificationerror').style.display = "none";
    document.getElementById('verificationsuccessful').style.display = "none";

    window.scrollTo(0,0);

    //verify the token and display the components accordingly
    this.route.queryParams.subscribe(params=>{
      this.token=params.verifytoken;
      if(this.token){
        console.log(this.token)
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
        console.log('no data');
        //TODO: route to error page
      }
    })
    
    
  }
  reRouteToLogin(){
    this.router.navigate(['/healthcare/login']);
  }
}
