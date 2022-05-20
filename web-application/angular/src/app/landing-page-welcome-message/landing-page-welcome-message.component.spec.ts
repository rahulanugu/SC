import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageWelcomeMessageComponent } from './landing-page-welcome-message.component';

describe('LandingPageWelcomeMessageComponent', () => {
  let component: LandingPageWelcomeMessageComponent;
  let fixture: ComponentFixture<LandingPageWelcomeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageWelcomeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageWelcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
