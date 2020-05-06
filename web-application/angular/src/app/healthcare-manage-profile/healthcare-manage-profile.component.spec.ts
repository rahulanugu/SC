import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareManageProfileComponent } from './healthcare-manage-profile.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HealthcareManageProfileComponent', () => {
  let component: HealthcareManageProfileComponent;
  let fixture: ComponentFixture<HealthcareManageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
    ],
      declarations: [ HealthcareManageProfileComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a deactivate button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#deactivateButton').textContent).toContain('DEACTIVATE');
  });
});
