// contribution
// Sammy - filter blogs based on the drop down value and update blog list accordingly
// Stephanie - get and filter blog posts from Wordpress API (started 12/16)

import { Component, OnInit } from "@angular/core";
import { BlogCardComponent } from "../shared/components/blog-card/blog-card.component";
import { BlogService } from '../shared/blogService.service';
import { IndustryCardComponent } from "../shared/components/industry-card/industry-quote-card.component";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit {
  blogList: any;
  errorMessage: any;
  categoryList: any;
  numberOfPages = 1;
  currentPage = 1;
  numberPerPage = 9;

  constructor(private blogService: BlogService) {}

  industryCard = IndustryCardComponent;

  ngOnInit() {
    this.getPosts;
    this.getCategories;
  }
  // Accesses blog posts from blogService or returns error
  getPosts() {
    this.blogService.getPosts().subscribe((data) => {
      this.blogList = data;
      console.log(data);
    },
    (error) => {
      this.errorMessage = error.message;
      console.log(error);
    })
  }
  // Accesses list of category objects from blogService or returns error
  getCategories() {
    this.blogService.getCategories().subscribe((data) => {
      this.categoryList = data;
      console.log(data);
    },
    (error) => {
      this.errorMessage = error.message;
      console.log(error);
    })
  }

  public selectedCategory;

  // Filters list of posts based on chosen category
  public categoryFilter() {
    this.blogList = this.blogList.filter(
      blog => blog.categories[0].name === this.selectedCategory
    );
    if(this.selectedCategory === "undefined"){
      this.blogList = this.blogList
    }
  }

  public load() {
    this.numberOfPages = Math.ceil(this.blogList.length / this.numberOfPages);
  }

  public nextPage() {
    if(this.currentPage != this.numberPerPage) {
      this.currentPage +=1;
      this.load()
    }
  }

  public previousPage() {
    if(this.currentPage != 1) {
      this.currentPage -= 1;
      this.load();
    }
  }

}

