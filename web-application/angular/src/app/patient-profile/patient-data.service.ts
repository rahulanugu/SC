import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PatientDataService {
  private patientData;
  constructor() {
    this.patientData = {};
  }

  getPatientVitals(): Observable<JSON> {
    return this.patientData.asObservable();
  }
  updatePatientData(patient_data: JSON) {
    this.patientData.next(patient_data);
  }
}
