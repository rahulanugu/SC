import { TestBed } from '@angular/core/testing';

import { PatientportalService } from './patientportal.service';

describe('PatientportalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientportalService = TestBed.get(PatientportalService);
    expect(service).toBeTruthy();
  });
});
