import { TestBed } from '@angular/core/testing';

import { PatientEditService } from './patient-edit.service';

describe('PatientEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientEditService = TestBed.get(PatientEditService);
    expect(service).toBeTruthy();
  });
});
