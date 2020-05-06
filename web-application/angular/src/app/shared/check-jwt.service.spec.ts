import { TestBed } from '@angular/core/testing';

import { CheckJwtService } from './check-jwt.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckJwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
  ]
  }));

  it('should be created', () => {
    const service: CheckJwtService = TestBed.get(CheckJwtService);
    expect(service).toBeTruthy();
  });
});
