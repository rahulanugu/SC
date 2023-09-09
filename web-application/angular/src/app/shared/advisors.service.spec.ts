import { TestBed } from '@angular/core/testing';

import { AdvisorsService } from './advisors.service';

describe('AdvisorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvisorsService = TestBed.get(AdvisorsService);
    expect(service).toBeTruthy();
  });
});