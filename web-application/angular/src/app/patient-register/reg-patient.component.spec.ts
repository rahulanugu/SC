import { TextMaskModule } from 'angular2-text-mask';
import { FooterComponent } from './../footer/footer.component';
import { CommonHeaderComponent } from './../common-header/common-header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPatientComponent } from './reg-patient.component';

describe('RegPatientComponent', () => {
  let component: RegPatientComponent;
  let fixture: ComponentFixture<RegPatientComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPatientComponent, CommonHeaderComponent, FooterComponent ],
      imports: [FormsModule, TextMaskModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
