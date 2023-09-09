import { FooterComponent } from '../footer/footer.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthcareRegisterComponent } from './healthcare-register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TextMaskModule } from 'angular2-text-mask';
describe('HealthcareRegisterComponent', () => {
  let component: HealthcareRegisterComponent;
  let fixture: ComponentFixture<HealthcareRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        TextMaskModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ HealthcareRegisterComponent, CommonHeaderComponent, FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
