import { FooterComponent } from './../footer/footer.component';
import { CommonHeaderComponent } from './../common-header/common-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareLoginComponent } from './healthcare-login.component';

describe('HealthcareLoginComponent', () => {
  let component: HealthcareLoginComponent;
  let fixture: ComponentFixture<HealthcareLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcareLoginComponent, CommonHeaderComponent,FooterComponent ],
      imports:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcareLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
