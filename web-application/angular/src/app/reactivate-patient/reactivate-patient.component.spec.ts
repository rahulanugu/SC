import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivatePatientComponent } from './reactivate-patient.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReactivatePatientComponent', () => {
  let component: ReactivatePatientComponent;
  let fixture: ComponentFixture<ReactivatePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
    ],
      declarations: [ ReactivatePatientComponent, CommonHeaderComponent, FooterComponent ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
