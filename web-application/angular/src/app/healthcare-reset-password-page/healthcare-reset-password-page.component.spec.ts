import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareResetPasswordPageComponent } from './healthcare-reset-password-page.component';

describe('HealthcareResetPasswordPageComponent', () => {
  let component: HealthcareResetPasswordPageComponent;
  let fixture: ComponentFixture<HealthcareResetPasswordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareResetPasswordPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareResetPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
