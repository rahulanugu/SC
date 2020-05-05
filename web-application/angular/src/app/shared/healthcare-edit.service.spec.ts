import { TestBed } from '@angular/core/testing';

import { HealthcareEditService } from './healthcare-edit.service';

describe('HealthcareEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthcareEditService = TestBed.get(HealthcareEditService);
    expect(service).toBeTruthy();
  });
});
