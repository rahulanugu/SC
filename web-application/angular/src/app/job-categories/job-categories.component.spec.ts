import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobCategoriesComponent } from './job-categories.component';
import { JobOpeningsComponent } from '../job-openings/job-openings.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('JobCategoriesComponent', () => {
  let component: JobCategoriesComponent;
  let fixture: ComponentFixture<JobCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ JobCategoriesComponent, JobOpeningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
