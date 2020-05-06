import { TestBed } from '@angular/core/testing';

import { CareersService } from './careers.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CareersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
  ]
  }));

  it('should be created', () => {
    const service: CareersService = TestBed.get(CareersService);
    expect(service).toBeTruthy();
  });
});
