import { FooterComponent } from '../footer/footer.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllscriptsLoginComponent } from './allscripts-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AllscriptsLoginComponent', () => {
  let component: AllscriptsLoginComponent;
  let fixture: ComponentFixture<AllscriptsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ AllscriptsLoginComponent, CommonHeaderComponent,FooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllscriptsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
