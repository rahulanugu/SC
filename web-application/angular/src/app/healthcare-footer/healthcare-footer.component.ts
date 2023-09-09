import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-healthcare-footer',
  templateUrl: './healthcare-footer.component.html',
  styleUrls: ['./healthcare-footer.component.css']
})
export class HealthcareFooterComponent implements OnInit {
  currentYear: number;

  constructor() { 
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
