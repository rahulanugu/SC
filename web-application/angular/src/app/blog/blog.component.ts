// contribution 
// Sammy - filter blogs based on the drop down value and update blog list accordingly
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
  blogList = [];
  categoryList = [];
  numberOfPages = 1;
  currentPage = 1;
  numberPerPage = 9;
  
  constructor(
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.blogList = this.blogService.blogList
    this.categoryList = this.blogService.categoryList
    console.log(this.categoryList)
  }
  industryCard = IndustryCardComponent;

  public selectedCategory;
  public categoryFilter() {
    console.log(this.selectedCategory)
    console.log(this.blogList)
    this.blogList = this.blogService.blogList.filter(
      blog => blog.category === this.selectedCategory
    );  
    if(this.selectedCategory === "undefined"){
      this.blogList = this.blogService.blogList
    }
  }


  public load() {
    this.numberOfPages = Math.ceil(this.blogList.length / this.numberOfPages);
  }
  
}

