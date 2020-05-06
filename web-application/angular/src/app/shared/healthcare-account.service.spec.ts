import { TestBed } from '@angular/core/testing';

import { HealthcareAccountService } from './healthcare-account.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HealthcareAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
  ]
  }));

  it('should be created', () => {
    const service: HealthcareAccountService = TestBed.get(HealthcareAccountService);
    expect(service).toBeTruthy();
  });
});
