//  Kefan - develop the entire page
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blogService.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-blog-post-quote',
  templateUrl: './blog-post-quote.component.html',
  styleUrls: ['./blog-post-quote.component.css']
})
export class BlogPostQuoteComponent implements OnInit {
  category: any;
  errorMessage: any;
  blogList: any;
  relateList: any;
  slug: any;
  name: any;
  content: any;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.getCategory();
    this.getPosts();
  }
  goBack() {
    this.router.navigate(['blog']);
  }
  getCategory() {
    this.blogService.getSingleCategories(this.slug).subscribe((data) => {
      console.log(data);
      this.category = data;
      this.name = this.category.name;
      this.content = this.category.description;
    },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      })
  }

  getPosts() {
    this.blogService.getPosts().subscribe((data) => {
      console.log(data.posts);
      this.blogList = data.posts;
      this.blogList.forEach((elem, index) => {
        if (this.blogList[index].excerpt.length > 50) {
          this.blogList[index].excerpt = this.blogList[index].excerpt.substring(0, 50) + ' ...'
        }
      })
      console.log(this.blogList);
      if (this.name !== "Scriptchain") {
        this.blogList = this.blogList.filter(
          blog => Object.values(blog.categories)[0]["name"] === this.name
        );
      }
      this.relateList = this.blogList.slice(0, 3);
      //this.relateList = [...this.relateList, ...this.relateList, ...this.relateList];
      console.log(this.relateList);
    },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      })
  }

}
