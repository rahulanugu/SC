import { LoginPatientService } from './shared/login-patient.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PatientAuthGuard implements CanActivate {
  constructor(private _loginpatientService:LoginPatientService,
    private _router: Router){}
  canActivate() 
  {
    
    if(this._loginpatientService.loggedIn()){
      return true;
    }
    else{
      
      this._router.navigate(['patient/login']);
      return false;
    }
  }
}
