import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

/**
 * Register form for patient users
 */
@Component({
  selector: 'app-reg-patient',
  templateUrl: './reg-patient.component.html',
  styleUrls: ['../app.component.css'],
  providers: [DbService]
})
export class RegPatientComponent implements OnInit {

  constructor(private myservice: DbService) { }

  ngOnInit() {
  }

}
