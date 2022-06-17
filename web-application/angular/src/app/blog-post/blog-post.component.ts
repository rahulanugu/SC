// Sammy - update blog images and category text from blogservice
// Stephanie - updated to access single posts with id via Wordpress API
// Kefan - updated to get related posts and go back function

import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../shared/blogService.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { from } from 'rxjs';

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
  title: any;
  authorName: any;
  date: any;
  content: any;
  category: any;
  blogList: any;
  relateList: any;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  // Stores ID for post from URL and accesses corresponding post
  ngOnInit() {
    this.blogID = this.route.snapshot.paramMap.get('id') as string;
    this.getSinglePosts();
    this.getPosts();

  }

  // Accesses single blog posts from blogService using ID or returns error
  getSinglePosts() {
    this.blogService.getSinglePosts(this.blogID).subscribe((data) => {
      this.singlePosts = data;
      console.log(this.singlePosts);
      this.imgURL = this.singlePosts.post_thumbnail.URL;
      this.title = this.singlePosts.title;
      this.authorName = this.singlePosts.author.name;
      this.date = this.singlePosts.date;
      this.content = this.singlePosts.content;
      this.category = Object.values(this.singlePosts.categories)[0]["name"];
    },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      })
  }
  goBack() {
    this.router.navigate(['blog']);
  }

  getPosts() {
    this.blogService.getPosts().subscribe((data) => {
      console.log(data.posts);
      this.blogList = data.posts;
      this.blogList = this.blogList.filter(
        blog => Object.values(blog.categories)[0]["name"] === this.category
      );
      this.blogList.forEach((elem, index) => {
        if (this.blogList[index].excerpt.length > 50) {
          this.blogList[index].excerpt = this.blogList[index].excerpt.substring(0, 50) + ' ...'
        }
      })
      this.blogList = [...this.blogList, ...this.blogList];
      var idx = 0;
      for (idx = 0; idx < this.blogList.length; idx++) {
        if (this.blogList[idx].ID == this.singlePosts.ID) break;
      }
      this.relateList = this.blogList.slice(idx + 1, idx + 4);
      var lis = [];
      this.relateList.forEach((c) => {
        if (!lis.includes(c)) {
          lis.push(c);
        }
      });
      this.relateList = lis;
      //this.relateList = [...this.relateList, ...this.relateList, ...this.relateList];
      console.log(this.relateList);
    },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      })
  }


  // Access

}
