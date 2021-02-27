import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareReadmissionRiskInfoComponent } from './healthcare-readmission-risk-info.component';

describe('HealthcareReadmissionRiskInfoComponent', () => {
  let component: HealthcareReadmissionRiskInfoComponent;
  let fixture: ComponentFixture<HealthcareReadmissionRiskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareReadmissionRiskInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareReadmissionRiskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
