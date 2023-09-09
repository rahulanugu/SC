// Kefan - Developed the entire page

import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-industry-quote-card',
  templateUrl: './industry-quote-card.component.html',
  styleUrls: ['./industry-quote-card.component.css']
})
export class IndustryCardComponent implements OnInit {
  @Input() blogCategory: string = '';
  @Input() blogSlug: string;
  @Input() blogDescription: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  Relocate() {
    this.router.navigate(['/blog-post-quote', this.blogSlug]);
  }

}
