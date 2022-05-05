import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDemoAboutUsComponent } from './landing-page-demo-about-us.component';

describe('LandingPageDemoAboutUsComponent', () => {
  let component: LandingPageDemoAboutUsComponent;
  let fixture: ComponentFixture<LandingPageDemoAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageDemoAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDemoAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
