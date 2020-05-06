import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNavbarComponent } from './patient-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientNavbarComponent', () => {
  let component: PatientNavbarComponent;
  let fixture: ComponentFixture<PatientNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports: [
      RouterTestingModule,
      HttpClientModule
  ],
      declarations: [ PatientNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
