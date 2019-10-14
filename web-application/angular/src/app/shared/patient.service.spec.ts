import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

import { PatientService } from './patient.service';

describe('PatientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
      RouterModule.forRoot([]),
    ]
  }));

  it('should be created', () => {
    const service: PatientService = TestBed.get(PatientService);
    expect(service).toBeTruthy();
  });
});
