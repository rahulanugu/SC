import {ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './../footer/footer.component';
import { ContactUsFormComponent } from './../contact-us-form/contact-us-form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';
import { CommonHeaderComponent } from './../common-header/common-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';



describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent,ContactUsComponent,CommonHeaderComponent, ContactUsFormComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});