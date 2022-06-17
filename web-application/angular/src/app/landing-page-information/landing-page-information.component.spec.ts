import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageInformationComponent } from './landing-page-information.component';

describe('LandingPageInformationComponent', () => {
  let component: LandingPageInformationComponent;
  let fixture: ComponentFixture<LandingPageInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
