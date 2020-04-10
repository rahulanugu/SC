import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareResetPasswordComponent } from './healthcare-reset-password.component';

describe('HealthcareResetPasswordComponent', () => {
  let component: HealthcareResetPasswordComponent;
  let fixture: ComponentFixture<HealthcareResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
