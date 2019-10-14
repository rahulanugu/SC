import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RegisterSuccessfulPageComponent } from './register-successful-page.component';

describe('RegisterSuccessfulPageComponent', () => {
  let component: RegisterSuccessfulPageComponent;
  let fixture: ComponentFixture<RegisterSuccessfulPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSuccessfulPageComponent,FooterComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSuccessfulPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
