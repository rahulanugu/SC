import { CommonHeaderComponent} from '../common-header/common-header.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegPatientComponent } from './reg-patient.component';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TextMaskModule } from 'angular2-text-mask';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('RegPatientComponent', () => {
  let component: RegPatientComponent;
  let fixture: ComponentFixture<RegPatientComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPatientComponent,FooterComponent,CommonHeaderComponent],
      imports: [
        FormsModule,
        BrowserModule,
        TextMaskModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
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