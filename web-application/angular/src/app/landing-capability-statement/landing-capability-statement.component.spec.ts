import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCapabilityStatementComponent } from './landing-capability-statement.component';

describe('LandingCapabilityStatementComponent', () => {
  let component: LandingCapabilityStatementComponent;
  let fixture: ComponentFixture<LandingCapabilityStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCapabilityStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCapabilityStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
