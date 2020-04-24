import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedPatientComponent } from './deactivated-patient.component';

describe('DeactivatedPatientComponent', () => {
  let component: DeactivatedPatientComponent;
  let fixture: ComponentFixture<DeactivatedPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
