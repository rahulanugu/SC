import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareVerificationComponent } from './healthcare-verification.component';

describe('HealthcareVerificationComponent', () => {
  let component: HealthcareVerificationComponent;
  let fixture: ComponentFixture<HealthcareVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
