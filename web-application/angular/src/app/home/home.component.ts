import { Component, OnInit } from '@angular/core';
import { seedEvents } from '../../app/server.js';


/**
 * Home page component
 * TODO: make the bottom banner (client reviews) scroll automatically
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

}
