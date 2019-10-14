import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { VerificationService } from '../shared/verification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {
  token:object;

  constructor(private patientService: VerificationService,
    private activatedRoute: ActivatedRoute) { }


    ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params=>{
        this.token=params;
        if(this.token){
          this.onVerified();
        }else{
          console.log('no data');
        }
      })
    }

    //verification using token and jwt
    helperJWT(){
      return localStorage.getItem('user-jwt');
    }

    onVerified(){

      // verification using token and jwt
      const token = this.helperJWT();
      this.patientService.postVerifiredToken(token).subscribe(()=>{
        localStorage.removeItem('user-jwt');
      });
    }
}