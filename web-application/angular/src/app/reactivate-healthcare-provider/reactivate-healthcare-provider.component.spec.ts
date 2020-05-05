import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateHealthcareProviderComponent } from './reactivate-healthcare-provider.component';

describe('ReactivateHealthcareProviderComponent', () => {
  let component: ReactivateHealthcareProviderComponent;
  let fixture: ComponentFixture<ReactivateHealthcareProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactivateHealthcareProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivateHealthcareProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
