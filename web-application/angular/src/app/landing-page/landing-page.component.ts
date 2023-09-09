import { Component, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ContactusService } from '../shared/contactus.service';
import { ToastrNotificationService } from '../toastr-notification.service';

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})

export class LandingPageComponent implements OnInit {

  constructor(private contactUsService: ContactusService, private toastr: ToastrNotificationService) {}
  exform: FormGroup;
  ngOnInit() {
    this.exform = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'subject' : new FormControl(null,[Validators.required]),
      'message' : new FormControl(null, [Validators.required, Validators.minLength(10)])
    });

  }
  userModel = {};

  clicksub() {
    this.userModel={
      fname: this.exform.get('name').value.split(' ')[0],
      lname: this.exform.get('name').value.split(' ').slice(-1),
      email: this.exform.get('email').value,
      company: "SCH",
      message: this.exform.get('message').value
    }

    //this.contactUsService.sendEmail(this.userModel).subscribe(
    //  data => console.log('Success!!!!!',data),
    //  error => console.log("Error",error)
    //)

    // console.log('FROM LANDING PAGE', this.userModel);
    this.contactUsService.sendMessage(this.userModel).subscribe(data=>console.log('data', data));
    this.toastr.successToast("Message Sent! We will reach out to you soon.", "Contact Us");
    this.exform.reset();
  }
  get name() {
    return this.exform.get('name');
  }
  get email() {
    return this.exform.get('email');
  }
  get subject() {
    return this.exform.get('subject');
  }
  get message() {
    return this.exform.get('message');
  }

}
