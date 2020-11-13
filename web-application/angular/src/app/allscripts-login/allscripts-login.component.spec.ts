import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllscriptsLoginComponent } from './allscripts-login.component';

describe('AllscriptsLoginComponent', () => {
  let component: AllscriptsLoginComponent;
  let fixture: ComponentFixture<AllscriptsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllscriptsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllscriptsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
