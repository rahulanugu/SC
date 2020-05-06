import { TestBed } from '@angular/core/testing';

import { PatientEditService } from './patient-edit.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
  ]
  }));

  it('should be created', () => {
    const service: PatientEditService = TestBed.get(PatientEditService);
    expect(service).toBeTruthy();
  });
});
