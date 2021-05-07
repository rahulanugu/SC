import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAnalysisInfoComponent } from './risk-analysis-info.component';

describe('RiskAnalysisInfoComponent', () => {
  let component: RiskAnalysisInfoComponent;
  let fixture: ComponentFixture<RiskAnalysisInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAnalysisInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAnalysisInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
