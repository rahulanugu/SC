import { LoginPatientService } from './shared/login-patient.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PatientAuthGuard implements CanActivate {
  constructor(private _loginpatientService:LoginPatientService,
    private _router: Router){}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      var authorized;
      var authorized;
      await this._loginpatientService.loggedIn().then(
        res => {
            console.log("response recieved")
            authorized =  true;
          },
      ).catch(
        err => {
        console.log("error recieved")
        this._router.navigate(['patient/login']);
        authorized =  false;
      });
    return authorized;
  }
}
