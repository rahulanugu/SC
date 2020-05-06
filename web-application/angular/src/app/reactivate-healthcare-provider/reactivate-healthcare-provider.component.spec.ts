import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateHealthcareProviderComponent } from './reactivate-healthcare-provider.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReactivateHealthcareProviderComponent', () => {
  let component: ReactivateHealthcareProviderComponent;
  let fixture: ComponentFixture<ReactivateHealthcareProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
    ],
      declarations: [ ReactivateHealthcareProviderComponent, FooterComponent, CommonHeaderComponent]
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
