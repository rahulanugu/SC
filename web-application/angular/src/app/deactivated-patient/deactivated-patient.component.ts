import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deactivated-patient',
  templateUrl: './deactivated-patient.component.html',
  styleUrls: ['./deactivated-patient.component.css']
})
export class DeactivatedPatientComponent implements OnInit {

  // The page currently checks for query parameter
  // If there is a query parameter , then the page is displayed . Or else the page is redirected to error page.

  email: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(!params.email){
        this._router.navigate(['error500'])
      }
    })
  }

  reRouteToHome(){
    this._router.navigate(['/home']);
  }
}
