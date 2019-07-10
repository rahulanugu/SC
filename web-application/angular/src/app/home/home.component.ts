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

  /*slideIndex = 0;

  showSlides() {
    var i;
    var slides = document.getElementsByClassName("banner_slide_bottom");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }*/

  ngOnInit() {
    //this.showSlides();
  }

}
