import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ContactusService } from "../shared/contactus.service";
import { ToastrNotificationService } from "../toastr-notification.service";
import { Validators } from '@angular/forms';

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {
  breakpoint: number;
  constructor(private contactService: ContactusService, private toastr: ToastrNotificationService) {}
  exform: FormGroup;
  ngOnInit() {
    this.exform = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'subject' : new FormControl(null,[Validators.required]),
      'message' : new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  onContactClicked(form: NgForm) {
    this.contactService.sendMessage(form.value);
    this.toastr.successToast("Message sent", "Contact Us");
  }
  clicksub() {
    console.log(this.exform.value);
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
