import { TestBed } from '@angular/core/testing';

import { HealthcareviewService } from './healthcareview.service';

describe('HealthcareviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthcareviewService = TestBed.get(HealthcareviewService);
    expect(service).toBeTruthy();
  });
});
