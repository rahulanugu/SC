import { TestBed } from '@angular/core/testing';

import { RequestaccessnewuserService } from './requestaccessnewuser.service';

describe('RequestaccessnewuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestaccessnewuserService = TestBed.get(RequestaccessnewuserService);
    expect(service).toBeTruthy();
  });
});
