import { TestBed } from '@angular/core/testing';

import { HealthcareEditService } from './healthcare-edit.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HealthcareEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
  ]
  }));

  it('should be created', () => {
    const service: HealthcareEditService = TestBed.get(HealthcareEditService);
    expect(service).toBeTruthy();
  });
});
