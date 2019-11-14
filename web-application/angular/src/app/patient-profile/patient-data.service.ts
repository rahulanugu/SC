import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PatientDataService {
  private patientData;
  private insuranceExpense;
  constructor() {
    this.patientData = [
      {
        originDate: "08/12/2019",
        bloodPressure: "100",
        sugarLevel: "96mgdl",
        heartRate: "72bpm",
        Temperature: "98.2",
        painLevel: "70",
        height: "6'0'",
        weight: "72Kg",
        reasonForVisit: "some reason"
      },
      {
        originDate: "15/11/2019",
        bloodPressure: "98",
        sugarLevel: "94mgdl",
        heartRate: "73bpm",
        Temperature: "98.1",
        painLevel: "73",
        height: "6'0'",
        weight: "71.5Kg",
        reasonForVisit: "other reason"
      },
      {
        originDate: "10/11/2019",
        bloodPressure: "97",
        sugarLevel: "95mgdl",
        heartRate: "76bmp",
        Temperature: "99",
        painLevel: "75",
        height: "6'1'",
        weight: "72",
        reasonForVisit: "different reason"
      }
    ];
    this.insuranceExpense = {
      copayExpenseforDoctorVisit: 75,
      outOfPocketExpenseforDoctorVisit: 19,
      coPayExpenseforPrescription: 20,
      OutofPocketExpenseforPrescription: 8
    };
  }

  getPatientVitals(): Observable<JSON> {
    return this.patientData;
  }
  getInsuranceExpenses() {
    return this.insuranceExpense;
  }
}
