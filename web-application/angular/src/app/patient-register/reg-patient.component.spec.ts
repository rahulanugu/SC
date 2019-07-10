import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPatientComponent } from './reg-patient.component';

describe('RegPatientComponent', () => {
  let component: RegPatientComponent;
  let fixture: ComponentFixture<RegPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
