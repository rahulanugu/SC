import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDemoWelcomeMessageComponent } from './landing-page-demo-welcome-message.component';

describe('LandingPageDemoWelcomeMessageComponent', () => {
  let component: LandingPageDemoWelcomeMessageComponent;
  let fixture: ComponentFixture<LandingPageDemoWelcomeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageDemoWelcomeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDemoWelcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
