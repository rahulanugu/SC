import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareHeaderComponent } from './healthcare-header.component';

describe('HealthcareHeaderComponent', () => {
  let component: HealthcareHeaderComponent;
  let fixture: ComponentFixture<HealthcareHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
