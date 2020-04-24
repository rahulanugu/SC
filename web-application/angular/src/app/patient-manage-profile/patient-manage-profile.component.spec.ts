import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientManageProfileComponent } from './patient-manage-profile.component';

describe('PatientManageProfileComponent', () => {
  let component: PatientManageProfileComponent;
  let fixture: ComponentFixture<PatientManageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientManageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
