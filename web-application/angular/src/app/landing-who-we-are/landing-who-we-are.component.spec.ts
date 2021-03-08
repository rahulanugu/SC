import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingWhoWeAreComponent } from './landing-who-we-are.component';

describe('LandingWhoWeAreComponent', () => {
  let component: LandingWhoWeAreComponent;
  let fixture: ComponentFixture<LandingWhoWeAreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingWhoWeAreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingWhoWeAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
