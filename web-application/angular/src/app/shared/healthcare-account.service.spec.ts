import { TestBed } from '@angular/core/testing';

import { HealthcareAccountService } from './healthcare-account.service';

describe('HealthcareAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthcareAccountService = TestBed.get(HealthcareAccountService);
    expect(service).toBeTruthy();
  });
});
