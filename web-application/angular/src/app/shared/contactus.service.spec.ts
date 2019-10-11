import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactusService } from './contactus.service';

describe('ContactusService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ContactusService = TestBed.get(ContactusService);
    expect(service).toBeTruthy();
  });
});
