import { TestBed } from '@angular/core/testing';

import { HealthcareAuthGuard } from './healthcare-auth.guard';

describe('HealthcareAuthGuard', () => {
  let guard: HealthcareAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HealthcareAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
