import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFaq1Component } from './landing-faq1.component';

describe('LandingFaq1Component', () => {
  let component: LandingFaq1Component;
  let fixture: ComponentFixture<LandingFaq1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingFaq1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingFaq1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
