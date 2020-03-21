import { Component, OnInit } from "@angular/core";
import { contactus } from "./../shared/contactus.model";
import { ContactusService } from "./../shared/contactus.service";
import { FormBuilder, Validators } from "@angular/forms";

/**
 * Component: Contact us form
 * Description: Contact form for sending a message to the support team
 */
@Component({
  selector: "app-contact-us-form",
  templateUrl: "./contact-us-form.component.html",
  styleUrls: ["./contact-us-form.component.css", "../app.component.css"]
})
export class ContactUsFormComponent implements OnInit {
  contactusmodel = new contactus();

  constructor(
    private contactusservice: ContactusService,
    private formBuilderService: FormBuilder
  ) {}

  ngOnInit() {
    document.getElementById("contactsuccessful").style.display = "none";
  }
  onSubmit() {
    console.log(this.contactusmodel.message);
    // this.contactusservice.sendMessage(this.contactusmodel).subscribe(
    //   res=>{
    //     document.getElementById('contactForm').style.display = 'none';
    //     document.getElementById('contactsuccessful').style.display = 'block';
    //     window.location.hash = 'contactsuccessful';
    //   },
    //   err=>{
    //   }
    // )
  }
  Form = this.formBuilderService.group({
    FirstName: ["", Validators.required],
    LastName: ["", Validators.required],
    Email: ["", Validators.required],
    Message: ["", Validators.required]
  });
  onSubmit2() {
    //console.log(this.Form.value);
    this.contactusservice.sendMessage(this.Form.value).subscribe(
      res => {
        document.getElementById("contactForm").style.display = "none";
        document.getElementById("contactsuccessful").style.display = "block";
        window.location.hash = "contactsuccessful";
        window.location.hash = "contactsuccessful";
      },
      err => {
        //TODO: Redirect to an error component
      }
    );
  }
}
