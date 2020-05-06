import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientManageProfileComponent } from './patient-manage-profile.component';
import { PatientNavbarComponent } from '../patient-profile/patient-navbar/patient-navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PatientManageProfileComponent', () => {
  let component: PatientManageProfileComponent;
  let fixture: ComponentFixture<PatientManageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ PatientManageProfileComponent, PatientNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
