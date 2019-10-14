import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-successful-page',
  templateUrl: './register-successful-page.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterSuccessfulPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.showFinalPage();

    let stored = JSON.parse(localStorage.getItem("user-jwt"))
    if(!stored ==null){
      this.firstPage();
    }
  }
  firstPage(){
    this.router.navigate(['patient/register']);
  }

  showFinalPage(){
    document.getElementById("register_successful").style.display="block";
  }
}
