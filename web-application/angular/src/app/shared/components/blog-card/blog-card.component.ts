// Sammy - add input component to pass in different img from parent
// Stephanie - updated to be compatible with WP API object attributes
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
  @Input() blogCategories: any;
  @Input() blogID: any;
  @Input() blogTitle: any;
  @Input() blogContent: any;
  wordsToMinutes = 5;

  getColor() {
    switch(this.blogCategories[0].name){
      case 'Updates':
        return '#B27036'
      case 'AI':
        return '#B83D37'
      case 'Invest':
        return '#3458C2'
      case 'Patient':
        return '#7742C2'
      case 'Scholar':
        return '#E0AE48'
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
