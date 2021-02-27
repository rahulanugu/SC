import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareAccountSettingsComponent } from './healthcare-account-settings.component';

describe('HealthcareAccountSettingsComponent', () => {
  let component: HealthcareAccountSettingsComponent;
  let fixture: ComponentFixture<HealthcareAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
