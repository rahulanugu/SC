import { TestBed } from '@angular/core/testing';

import { CareersService } from './careers.service';

describe('CareersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CareersService = TestBed.get(CareersService);
    expect(service).toBeTruthy();
  });
});
