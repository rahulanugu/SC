import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../shared/reset-password.service';

/**
 * Page: Forgot password page for patient users
 * Description: Users will enter the email address for their account
 * and will recieve an email that contains link to the password reset page
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email:string ='Enter an email';
  visible:boolean = true;
  errorVisible: boolean = false;
  constructor(private service: ResetPasswordService) { }

  ngOnInit() {
    
  }

  submit(){
    this.service.requestPasswordChange(this.email).subscribe(
      response => {
        this.errorVisible = false;
        this.visible = !this.visible;
      },
      error => {
        console.log(error);
        this.errorVisible = true;
      }
    );
  }

}
