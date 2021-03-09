import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPartnershipsComponent } from './landing-partnerships.component';

describe('LandingPartnershipsComponent', () => {
  let component: LandingPartnershipsComponent;
  let fixture: ComponentFixture<LandingPartnershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPartnershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
