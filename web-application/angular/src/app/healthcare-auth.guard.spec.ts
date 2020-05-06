import { TestBed , async, inject} from '@angular/core/testing';

import { HealthcareAuthGuard } from './healthcare-auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HealthcareAuthGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthcareAuthGuard],
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should ...', inject([HealthcareAuthGuard], (guard: HealthcareAuthGuard) => {
    expect(guard).toBeTruthy();
  }));

});
