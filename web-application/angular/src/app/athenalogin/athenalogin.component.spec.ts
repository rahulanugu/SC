import { FooterComponent } from '../footer/footer.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AthenaLoginComponent } from './athenalogin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AthenaLoginComponent', () => {
  let component: AthenaLoginComponent;
  let fixture: ComponentFixture<AthenaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ AthenaLoginComponent, CommonHeaderComponent,FooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthenaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
