import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { PatientRegistertwoComponent } from './patient-registertwo.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TextMaskModule } from 'angular2-text-mask';
import { FooterComponent } from '../footer/footer.component'
import { Patient } from '../shared/patient.model';
describe('PatientRegistertwoComponent', () => {
  let component: PatientRegistertwoComponent;
  let fixture: ComponentFixture<PatientRegistertwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRegistertwoComponent,FooterComponent ],
      imports:[
        FormsModule,
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        TextMaskModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegistertwoComponent);
    component = fixture.componentInstance;
    component.patientService.selectedPatient = new Patient();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
