// Sammy - add input component to pass in different img from parent
import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
// const {wordsToMinutes, wordsToHours, wordsToSeconds} = require('words-to-time-converter');

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() blogImg: string  = '';
  @Input() blogCategory: string = '';
  wordsToMinutes = 5;
  
  getColor() {
    switch(this.blogCategory){
      case 'updates': 
        return '#B27036'
      case 'ai': 
        return '#B83D37'
      case 'invest': 
        return '#3458C2'
      case 'patient': 
        return '#7742C2'
      case 'scholar': 
        return '#E0AE48'
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
