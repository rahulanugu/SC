import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientAuthGuard } from './patient-auth.guard';


describe('PatientAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientAuthGuard],
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should ...', inject([PatientAuthGuard], (guard: PatientAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
