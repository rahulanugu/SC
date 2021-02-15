import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareConfirmationComponent } from './healthcare-confirmation.component';

describe('HealthcareConfirmationComponent', () => {
  let component: HealthcareConfirmationComponent;
  let fixture: ComponentFixture<HealthcareConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
