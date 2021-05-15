import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverProfileComponent } from './caregiver-profile.component';

describe('CaregiverProfileComponent', () => {
  let component: CaregiverProfileComponent;
  let fixture: ComponentFixture<CaregiverProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
