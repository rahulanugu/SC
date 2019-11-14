import { TestBed } from '@angular/core/testing';

import { PatientDataService } from './patient-data.service';

describe('PatientDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientDataService = TestBed.get(PatientDataService);
    expect(service).toBeTruthy();
  });
});
