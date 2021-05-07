import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCaregiverComponent } from './patient-caregiver.component';

describe('PatientCaregiverComponent', () => {
  let component: PatientCaregiverComponent;
  let fixture: ComponentFixture<PatientCaregiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCaregiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCaregiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
