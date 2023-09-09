// Kefan - connect the frontend hardcoded data to backend, retrive patient data from frontend
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthcareviewService {

  readonly DjangoUrl = "http://localhost:8000"
  readonly baseUrlHealthcare = this.DjangoUrl + "/generateAnalytics/"
  readonly fhirServiceUrl = this.DjangoUrl + "/FHIRgetData/"

  constructor(private http: HttpClient) { }

  getAnalytic(data) {
    const reqBody = data;
    return this.http.post(this.baseUrlHealthcare, reqBody);
  }
  getFHIRdata(id) {
    const reqBody = { 'id': id };
    return this.http.post(this.fhirServiceUrl, reqBody);
  }
}
