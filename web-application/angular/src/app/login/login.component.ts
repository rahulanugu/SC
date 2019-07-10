import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

/**
 * Login form for all users
 * Will redirect to appropriate landing pages upon login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  dataSource;

  constructor(/*private myservice: DbService*/) { }

  /*addUser(_username, _password){
    this.myservice.addUser(_username,_password);
  }*/

  ngOnInit() {
  }

}
