import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareProfileComponent } from './healthcare-profile.component';

describe('HealthcareProfileComponent', () => {
  let component: HealthcareProfileComponent;
  let fixture: ComponentFixture<HealthcareProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
