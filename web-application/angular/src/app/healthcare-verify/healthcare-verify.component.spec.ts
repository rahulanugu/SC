import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareVerifyComponent } from './healthcare-verify.component';

describe('HealthcareVerifyComponent', () => {
  let component: HealthcareVerifyComponent;
  let fixture: ComponentFixture<HealthcareVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
