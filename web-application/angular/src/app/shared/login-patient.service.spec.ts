import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginPatientService } from './login-patient.service';

describe('LoginPatientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: LoginPatientService = TestBed.get(LoginPatientService);
    expect(service).toBeTruthy();
  });
});
