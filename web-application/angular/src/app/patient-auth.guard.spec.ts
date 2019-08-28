import { TestBed, async, inject } from '@angular/core/testing';

import { PatientAuthGuard } from './patient-auth.guard';

describe('PatientAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientAuthGuard]
    });
  });

  it('should ...', inject([PatientAuthGuard], (guard: PatientAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
