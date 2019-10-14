import { Component, OnInit } from '@angular/core';
/**
 * 
 * Header for home page
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../app.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;
  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.isCollapsed = false;
    },5000);
  }

  myFunction() {
    console.log('santosh');
    var elmnt = document.getElementById("footer");
    elmnt.scrollIntoView();
  }
}
