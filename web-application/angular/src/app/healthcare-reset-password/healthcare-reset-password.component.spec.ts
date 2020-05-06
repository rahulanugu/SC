import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareResetPasswordComponent } from './healthcare-reset-password.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('HealthcareResetPasswordComponent', () => {
  let component: HealthcareResetPasswordComponent;
  let fixture: ComponentFixture<HealthcareResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ HealthcareResetPasswordComponent, FooterComponent, CommonHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
