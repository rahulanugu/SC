import { FooterComponent } from './../footer/footer.component';
import { CommonHeaderComponent } from './../common-header/common-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareRegisterComponent } from './healthcare-register.component';

describe('HealthcareRegisterComponent', () => {
  let component: HealthcareRegisterComponent;
  let fixture: ComponentFixture<HealthcareRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareRegisterComponent, CommonHeaderComponent, FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
