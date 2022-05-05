import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDemoHeaderComponent } from './landing-page-demo-header.component';

describe('LandingPageDemoHeaderComponent', () => {
  let component: LandingPageDemoHeaderComponent;
  let fixture: ComponentFixture<LandingPageDemoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageDemoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDemoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
