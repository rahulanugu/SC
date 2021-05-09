import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabResultInfoComponent } from './lab-result-info.component';

describe('LabResultInfoComponent', () => {
  let component: LabResultInfoComponent;
  let fixture: ComponentFixture<LabResultInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabResultInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabResultInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
