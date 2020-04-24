import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivatePatientComponent } from './reactivate-patient.component';

describe('ReactivatePatientComponent', () => {
  let component: ReactivatePatientComponent;
  let fixture: ComponentFixture<ReactivatePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactivatePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
