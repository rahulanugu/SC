import { TestBed } from '@angular/core/testing';

import { HealthcareLoginService } from './healthcare-login.service';

describe('HealthcareLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthcareLoginService = TestBed.get(HealthcareLoginService);
    expect(service).toBeTruthy();
  });
});
