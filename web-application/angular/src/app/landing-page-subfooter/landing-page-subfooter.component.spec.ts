import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageSubfooterComponent } from './landing-page-subfooter.component';

describe('LandingPageSubfooterComponent', () => {
  let component: LandingPageSubfooterComponent;
  let fixture: ComponentFixture<LandingPageSubfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageSubfooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageSubfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
