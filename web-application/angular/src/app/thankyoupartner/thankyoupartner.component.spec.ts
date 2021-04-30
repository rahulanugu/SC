import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyoupartnerComponent } from './thankyoupartner.component';

describe('ThankyoupartnerComponent', () => {
  let component: ThankyoupartnerComponent;
  let fixture: ComponentFixture<ThankyoupartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankyoupartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyoupartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
