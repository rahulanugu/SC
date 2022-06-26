import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactusService } from '../shared/contactus.service';
import { ToastrNotificationService } from '../toastr-notification.service';

/**
 * Page: Contact us page
 * Description: Users can send a message to the support team
 * An automated reciept mail will be sent to the user
 */
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css','../app.component.css']
})
export class ContactUsComponent implements OnInit {
 
  constructor(private contactUsService: ContactusService, private router: Router, private toastr: ToastrNotificationService) { }
  ngOnInit() {
    window.scrollTo(0,0);
 }

 onSubmit(form: NgForm) {
   this.contactUsService.sendMessage(form.value).subscribe(data=>console.log(data));
   this.router.navigate(['/', 'home']);
   this.toastr.successToast("Message Sent! We will reach out to you soon.", "Contact Us");
 }
  
  /*submit() {
    let mail = {
      FirstName: this.firstName.value;
    }

  }*/
}
