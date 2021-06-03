import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailsComponent } from './procedure-details.component';

describe('ProcedureDetailsComponent', () => {
  let component: ProcedureDetailsComponent;
  let fixture: ComponentFixture<ProcedureDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});