import { Component, OnInit } from '@angular/core';
import { HealthcareEditService } from '../shared/healthcare-edit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reactivate-healthcare-provider',
  templateUrl: './reactivate-healthcare-provider.component.html',
  styleUrls: ['./reactivate-healthcare-provider.component.css']
})
export class ReactivateHealthcareProviderComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router:Router,

    private healthcaretEditService: HealthcareEditService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(!params.token){
        // this._router.navigate(['error500'])
      } else this.reactivateUser(params.token);
    })
  }

  reactivateUser(userToken){
    //console.log("reactivateuser() invoked")
    const healthcareProviderdetails = {
      token : userToken
    }
    this.healthcaretEditService.reactivateAccount(healthcareProviderdetails).subscribe(
      response => {
        //console.log("successfully reactivated the account");
      },

      error => {
        //console.log(error)
        //console.log("An error occured trying to reactivate")
        // this._router.navigate(['error500'])
      }
    );
  }

  reRouteToLogin(){
    this._router.navigate(['healthcare/login'])
  }

}
