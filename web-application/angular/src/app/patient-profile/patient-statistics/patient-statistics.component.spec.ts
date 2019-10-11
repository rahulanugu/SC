import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStatisticsComponent } from './patient-statistics.component';

describe('PatientStatisticsComponent', () => {
  let component: PatientStatisticsComponent;
  let fixture: ComponentFixture<PatientStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
