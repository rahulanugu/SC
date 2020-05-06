import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobComponent } from './apply-job.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { jobOpening } from '../careers/careers.component';

describe('ApplyJobComponent', () => {
  let component: ApplyJobComponent;
  let fixture: ComponentFixture<ApplyJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
    ],
      declarations: [ ApplyJobComponent , CommonHeaderComponent, FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyJobComponent);
    component = fixture.componentInstance;
    component.job = new jobOpening('testingid123','testposition','mockdescription',1,'testlocation','testing@example.com');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
