import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareRegisterComponent } from './healthcare-register.component';

describe('HealthcareRegisterComponent', () => {
  let component: HealthcareRegisterComponent;
  let fixture: ComponentFixture<HealthcareRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
