import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDemoComponent } from './landing-page-demo.component';

describe('LandingPageDemoComponent', () => {
  let component: LandingPageDemoComponent;
  let fixture: ComponentFixture<LandingPageDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
