import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareFooterComponent } from './healthcare-footer.component';

describe('HealthcareFooterComponent', () => {
  let component: HealthcareFooterComponent;
  let fixture: ComponentFixture<HealthcareFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
