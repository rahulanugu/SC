import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationDetailsComponent } from './medication-details.component';

describe('MedicationDetailsComponent', () => {
  let component: MedicationDetailsComponent;
  let fixture: ComponentFixture<MedicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
