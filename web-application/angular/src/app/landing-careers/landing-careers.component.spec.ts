import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCareersComponent } from './landing-careers.component';

describe('LandingCareersComponent', () => {
  let component: LandingCareersComponent;
  let fixture: ComponentFixture<LandingCareersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCareersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
