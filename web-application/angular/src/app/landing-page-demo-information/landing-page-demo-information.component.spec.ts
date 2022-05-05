import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDemoInformationComponent } from './landing-page-demo-information.component';

describe('LandingPageDemoInformationComponent', () => {
  let component: LandingPageDemoInformationComponent;
  let fixture: ComponentFixture<LandingPageDemoInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageDemoInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDemoInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
