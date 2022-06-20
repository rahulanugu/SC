import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostQuoteComponent } from './blog-post-quote.component';

describe('BlogPostQuoteComponent', () => {
  let component: BlogPostQuoteComponent;
  let fixture: ComponentFixture<BlogPostQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostQuoteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
