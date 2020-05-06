import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHealthcareviewComponent } from './patient-healthcareview.component';
import { HighchartsChartComponent } from 'highcharts-angular';

describe('PatientHealthcareviewComponent', () => {
  let component: PatientHealthcareviewComponent;
  let fixture: ComponentFixture<PatientHealthcareviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHealthcareviewComponent, HighchartsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHealthcareviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
