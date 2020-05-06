import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersComponent } from './careers.component';
import { CommonHeaderComponent } from '../common-header/common-header.component';
import { JobCategoriesComponent } from '../job-categories/job-categories.component';
import { FooterComponent } from '../footer/footer.component';
import { JobOpeningsComponent } from '../job-openings/job-openings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CareersComponent', () => {
  let component: CareersComponent;
  let fixture: ComponentFixture<CareersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ CareersComponent, FooterComponent, CommonHeaderComponent, JobCategoriesComponent, JobOpeningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
