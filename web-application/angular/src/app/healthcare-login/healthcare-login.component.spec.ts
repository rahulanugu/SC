import { FooterComponent } from '../footer/footer.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthcareLoginComponent } from './healthcare-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('HealthcareLoginComponent', () => {
  let component: HealthcareLoginComponent;
  let fixture: ComponentFixture<HealthcareLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ HealthcareLoginComponent, CommonHeaderComponent,FooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
