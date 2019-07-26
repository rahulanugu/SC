import { Component, OnInit } from '@angular/core';

/**
 * General register form for all types of users
 * Will redirect to appropriate registration upon selection of user type
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

}
