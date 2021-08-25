import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal-progress-bar',
  templateUrl: './portal-progress-bar.component.html',
  styleUrls: ['./portal-progress-bar.component.css']
})
export class PortalProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() name: string = '';
  @Input() value: number = 0;
  @Input() link: string = '';
  @Input() show: string = 'all';
  @Input() diagnosed: boolean = false;
}
