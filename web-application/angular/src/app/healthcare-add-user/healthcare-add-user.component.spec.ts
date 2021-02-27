import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareAddUserComponent } from './healthcare-add-user.component';

describe('HealthcareAddUserComponent', () => {
  let component: HealthcareAddUserComponent;
  let fixture: ComponentFixture<HealthcareAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
