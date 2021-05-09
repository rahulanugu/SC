import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLoginProfileComponent } from './patient-login-profile.component';

describe('PatientLoginProfileComponent', () => {
  let component: PatientLoginProfileComponent;
  let fixture: ComponentFixture<PatientLoginProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientLoginProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLoginProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
