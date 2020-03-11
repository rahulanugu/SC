import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../shared/reset-password.service';

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
        this.errorVisible = true;
      }
    );
  }

}
