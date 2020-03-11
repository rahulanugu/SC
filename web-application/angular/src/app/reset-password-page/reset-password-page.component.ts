import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckJwtService } from '../shared/check-jwt.service';
import { ResetPasswordService } from '../shared/reset-password.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  password:string ='';
  rePassword: string = '';
  errorVisible: boolean = false;
  visible:boolean = true;
  errorUpdating:boolean = false;

  constructor(private route: ActivatedRoute,
    private service : CheckJwtService,
    private resetPasswordService: ResetPasswordService) { }

  ngOnInit() {
    //on intialization of the page, decode the jwt token and then see if the email for it exists in the db
    this.service.verifyJwtStatus(this.route.snapshot.params['token']).subscribe(
      //If an error occurs verifying the jwt token, then redirect
    error => {
      //TODO: Route to the error 404 page
    });  
    //now on submission of passwords that match, will have to send back a request with new password and jwt token
  }

  onSubmission(){
      if(!(this.password === this.rePassword)){
        this.errorVisible = true;
      }else {
        this.resetPasswordService.makePasswordChange(this.route.snapshot.params['token'],this.password).subscribe(
          response => {
            this.errorVisible = false;
            this.visible = !this.visible;
          },
          error => {
            this.errorVisible = false;
            this.errorUpdating = true; 
          }
        );        
      }
  }

}
