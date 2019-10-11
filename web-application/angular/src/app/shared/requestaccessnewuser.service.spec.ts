import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RequestaccessnewuserService } from './requestaccessnewuser.service';

describe('RequestaccessnewuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RequestaccessnewuserService = TestBed.get(RequestaccessnewuserService);
    expect(service).toBeTruthy();
  });
});
