import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

/**
 * Registration succesful page
 */
@Component({
  selector: 'app-register-successful-page',
  templateUrl: './register-successful-page.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterSuccessfulPageComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showFinalPage();
  }
  firstPage(){
    this.router.navigate(['patient/register']);
  }

  showFinalPage(){
    let stored = JSON.parse(localStorage.getItem("user-jwt"))
    //console.log(stored);
    if(stored ==null){
      this.firstPage();
    }else{
      document.getElementById("register_successful").style.display="block";
    }
  }
}
