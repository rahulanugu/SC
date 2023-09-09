//Charan Jagwani: Created
import { Component, OnInit } from '@angular/core';
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
  userModel = {};

  getValue(val){
    this.userModel = {
      fname: val.fname,
      lname: val.lname,
      email: val.email,
      company: "SCH",
      message: val.message
    }
    this.onSubmit2();
  }
 
//on submit button send confirmation email and notification email
 onSubmit2() {

    //this.contactUsService.sendEmail(this.userModel).subscribe(
    //  data => console.log('Success!!!!!',data),
    //  error => console.log("Error",error)
    //)

    //console.log("FROM CONTACT US PAGE");
    this.contactUsService.sendMessage(this.userModel).subscribe(data=>console.log('printed',data));
    this.router.navigate(['/', 'home']);
    this.toastr.successToast("Message Sent! We will reach out to you soon.", "Contact Us");
 }
}
