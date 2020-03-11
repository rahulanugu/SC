import { TestBed } from '@angular/core/testing';

import { CheckJwtService } from './check-jwt.service';

describe('CheckJwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckJwtService = TestBed.get(CheckJwtService);
    expect(service).toBeTruthy();
  });
});
