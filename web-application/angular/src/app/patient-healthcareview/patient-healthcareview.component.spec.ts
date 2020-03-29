import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHealthcareviewComponent } from './patient-healthcareview.component';

describe('PatientHealthcareviewComponent', () => {
  let component: PatientHealthcareviewComponent;
  let fixture: ComponentFixture<PatientHealthcareviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHealthcareviewComponent ]
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
