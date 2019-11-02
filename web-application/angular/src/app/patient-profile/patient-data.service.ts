import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PatientDataService {
  private messageSource = new BehaviorSubject({
    bp: 70,
    heartrate: 85,
    sugarlevel: 96,
    temperature: 98,
    painlevel: 94
  });
  currentMessage = this.messageSource.asObservable();

  constructor() {}
  changeMessage(message) {
    this.messageSource.next(message);
  }
}
