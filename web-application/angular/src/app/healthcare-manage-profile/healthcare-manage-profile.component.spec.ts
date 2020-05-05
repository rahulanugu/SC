import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareManageProfileComponent } from './healthcare-manage-profile.component';

describe('HealthcareManageProfileComponent', () => {
  let component: HealthcareManageProfileComponent;
  let fixture: ComponentFixture<HealthcareManageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareManageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
