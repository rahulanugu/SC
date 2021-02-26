import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareWelcomeEmailComponent } from './healthcare-welcome-email.component';

describe('HealthcareWelcomeEmailComponent', () => {
  let component: HealthcareWelcomeEmailComponent;
  let fixture: ComponentFixture<HealthcareWelcomeEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareWelcomeEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareWelcomeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
