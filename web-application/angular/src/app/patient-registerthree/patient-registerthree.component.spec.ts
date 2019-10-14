import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { PatientRegisterthreeComponent } from './patient-registerthree.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent} from '../footer/footer.component'
describe('PatientRegisterthreeComponent', () => {
  let component: PatientRegisterthreeComponent;
  let fixture: ComponentFixture<PatientRegisterthreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRegisterthreeComponent,FooterComponent ],
      imports:[
        FormsModule,
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegisterthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
