import { TestBed } from '@angular/core/testing';

import { LoginPatientService } from './login-patient.service';

describe('LoginPatientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginPatientService = TestBed.get(LoginPatientService);
    expect(service).toBeTruthy();
  });
});
