import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthcareResetPasswordPageComponent } from './healthcare-reset-password-page.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { FooterComponent } from '../footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HealthcareResetPasswordPageComponent', () => {
  let component: HealthcareResetPasswordPageComponent;
  let fixture: ComponentFixture<HealthcareResetPasswordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ HealthcareResetPasswordPageComponent, CommonHeaderComponent, FooterComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareResetPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
