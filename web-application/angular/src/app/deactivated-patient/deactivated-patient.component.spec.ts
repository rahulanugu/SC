import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedPatientComponent } from './deactivated-patient.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeactivatedPatientComponent', () => {
  let component: DeactivatedPatientComponent;
  let fixture: ComponentFixture<DeactivatedPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
    ],
      declarations: [ DeactivatedPatientComponent, FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
