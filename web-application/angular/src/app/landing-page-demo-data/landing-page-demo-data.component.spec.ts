import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDemoDataComponent } from './landing-page-demo-data.component';

describe('LandingPageDemoDataComponent', () => {
  let component: LandingPageDemoDataComponent;
  let fixture: ComponentFixture<LandingPageDemoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageDemoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDemoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
