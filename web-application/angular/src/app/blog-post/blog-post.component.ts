// Sammy - update blog images and category text from blogservice
// Stephanie - updated to access single posts with id via Wordpress API
import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../shared/blogService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  singlePosts: any;
  errorMessage: any;
  imgURL: any;
  blogID: any;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  // Stores ID for post from URL and accesses corresponding post
  ngOnInit() {
    this.blogID = this.route.snapshot.paramMap.get('id') as string;
    this.getSinglePosts();
  }

  // Accesses single blog posts from blogService using ID or returns error
  getSinglePosts() {
    this.blogService.getSinglePosts(this.blogID).subscribe((data) => {
      this.singlePosts = JSON.parse(data);
      this.imgURL = this.singlePosts.post_thumbnail.URL;
      console.log(data);
    },
    (error) => {
      this.errorMessage = error.message;
      console.log(error);
    })
  }

}
