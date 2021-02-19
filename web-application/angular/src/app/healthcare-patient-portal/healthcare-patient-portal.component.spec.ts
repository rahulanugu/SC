import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcarePatientPortalComponent } from './healthcare-patient-portal.component';

describe('HealthcarePatientPortalComponent', () => {
  let component: HealthcarePatientPortalComponent;
  let fixture: ComponentFixture<HealthcarePatientPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcarePatientPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcarePatientPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
