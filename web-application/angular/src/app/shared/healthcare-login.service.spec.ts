import { TestBed } from '@angular/core/testing';

import { HealthcareLoginService } from './healthcare-login.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HealthcareLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
  ]
  }));

  it('should be created', () => {
    const service: HealthcareLoginService = TestBed.get(HealthcareLoginService);
    expect(service).toBeTruthy();
  });
});
