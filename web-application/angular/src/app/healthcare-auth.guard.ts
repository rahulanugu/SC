import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPatientService } from './shared/login-patient.service';
import { HealthcareLoginService } from './shared/healthcare-login.service';

@Injectable({
  providedIn: 'root'
})
export class HealthcareAuthGuard implements CanActivate {
  constructor(private healthcareService :HealthcareLoginService,
    private _router: Router){}
    
    /**
     * The execution contains asynchroous calls
     * The same functionalit can also be attained with promises
     * But opted asyncronous as only one http request is being made
     */
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      var authorized;
      await this.healthcareService.loggedIn().then(
        res => {
            console.log("response recieved")
            authorized =  true;
          },
        
      ).catch(
        err => {
        console.log("error recieved")
        this._router.navigate(['healthcare/login']);
        authorized =  false;
      });
      return authorized;
  }
}
