import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../shared/reset-password.service';

@Component({
  selector: 'app-healthcare-reset-password',
  templateUrl: './healthcare-reset-password.component.html',
  styleUrls: ['./healthcare-reset-password.component.css']
})
export class HealthcareResetPasswordComponent implements OnInit {
  email:string ='Enter an email';
  visible:boolean = true;
  errorVisible: boolean = false;
  constructor(private service: ResetPasswordService) { }

  ngOnInit() {

    

  }

  submit(){
    this.service.requestPasswordChangeForHealthcare(this.email).subscribe(
      response => {
        //console.log(response);
        //console.log(this.visible);
        this.errorVisible = false;
        this.visible = !this.visible;
      },
      error => {
        //console.log(error);
        this.errorVisible = true;
      }
    );
  }
}
