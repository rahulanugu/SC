import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { VerificationService } from './verification.service';

describe('VerificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
      RouterModule.forRoot([]),
    ]
  }));

  it('should be created', () => {
    const service: VerificationService = TestBed.get(VerificationService);
    expect(service).toBeTruthy();
  });
});
