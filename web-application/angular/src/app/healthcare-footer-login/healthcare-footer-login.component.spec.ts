import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareFooterLoginComponent } from './healthcare-footer-login.component';

describe('app-healthcare-footer', () => {
  let component: HealthcareFooterLoginComponent;
  let fixture: ComponentFixture<HealthcareFooterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareFooterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareFooterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
