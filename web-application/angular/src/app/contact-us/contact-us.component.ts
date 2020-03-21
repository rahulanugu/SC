import { Component, OnInit } from '@angular/core';

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
 
  constructor() { }
  ngOnInit() {
    window.scrollTo(0,0);
 }
  
}
