// Sammy - update blog images and category text from blogservice
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blogService.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  blogList = [];
  categoryList = [];
  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.blogList = this.blogService.blogList.filter(
      blog => blog.category === 'updates'
    )
    this.categoryList = this.blogService.categoryList
  }

}
