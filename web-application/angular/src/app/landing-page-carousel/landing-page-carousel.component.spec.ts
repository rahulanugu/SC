import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageCarouselComponent } from './landing-page-carousel.component';

describe('LandingPageCarouselComponent', () => {
  let component: LandingPageCarouselComponent;
  let fixture: ComponentFixture<LandingPageCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
