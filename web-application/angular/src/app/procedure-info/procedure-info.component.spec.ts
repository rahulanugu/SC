import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureInfoComponent } from './procedure-info.component';

describe('ProcedureInfoComponent', () => {
  let component: ProcedureInfoComponent;
  let fixture: ComponentFixture<ProcedureInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
