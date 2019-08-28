import { RequestaccessnewuserService } from './../shared/requestaccessnewuser.service';

import { Component, OnInit } from '@angular/core';
import { ifError } from 'assert';
/**
 * Request demo form 
 */
@Component({
  selector: 'app-request-demo',
  templateUrl: './request-demo.component.html',
  styleUrls: ['../app.component.css']
})
export class RequestDemoComponent implements OnInit {
 

  constructor(private requestaccessservice: RequestaccessnewuserService) { 
    this.requestaccessservice.user={
      _id:"",
      fname: "",
      lname: "",
      email:"",
      typeOfUser: ""
    }
  }

  ngOnInit() {
    document.getElementById("requestAccessSuccess").style.display="none";
    document.getElementById("userexistalready").style.display = "none";
  }
  requestAccess(){
     
    this.requestaccessservice.requestAccessforNewUser(this.requestaccessservice.user).subscribe(res=>{
      document.getElementById('rform').remove();
      document.getElementById("userexistalready").style.display = "none";
      document.getElementById('requestAccessSuccess').style.display="block";
     
    }, err => {
      document.getElementById('userexistalready').style.display="block";
    }
    );
    
  }
}
