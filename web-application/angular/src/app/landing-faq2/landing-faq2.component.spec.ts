import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFaq2Component } from './landing-faq2.component';

describe('LandingFaq2Component', () => {
  let component: LandingFaq2Component;
  let fixture: ComponentFixture<LandingFaq2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingFaq2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingFaq2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
