import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-industry-quote-card',
  templateUrl: './industry-quote-card.component.html',
  styleUrls: ['./industry-quote-card.component.css']
})
export class IndustryCardComponent implements OnInit {
  @Input() blogCategory: string = '';
  constructor() { }

  ngOnInit() {
  }

}
