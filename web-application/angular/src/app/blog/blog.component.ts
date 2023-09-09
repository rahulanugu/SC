// contribution
// Sammy - filter blogs based on the drop down value and update blog list accordingly
// Stephanie - get and filter blog posts from Wordpress API
// Kefan - implement pagination, category filter

import { Component, OnInit } from "@angular/core";
import { BlogCardComponent } from "../shared/components/blog-card/blog-card.component";
import { BlogService } from '../shared/blogService.service';
import { IndustryCardComponent } from "../shared/components/industry-card/industry-quote-card.component";
import { max } from "rxjs/operators";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit {
  blogList: any; // the list of all the blogs
  showList: any; // the list filtered by category
  curList: any; // the list of blogs need to be shown on the current page

  pageList: number[];

  errorMessage: any;
  categoryList: any;
  slug: any;

  numberOfPages: number;
  currentPage: number;
  numberPerPage = 8; // 8 + 1
  maxLen = 10;

  scriptchain_description = "Value based medicine is where the industry is looking to in order to build better patient outcomes, lower healthcare waste and assist physicians avoiding overtreatment/undertreatment. Now is the time for healthcare systems to adopt to innovative solutions!";
  description = "Value based medicine is where the industry is looking to in order to build better patient outcomes, lower healthcare waste and assist physicians avoiding overtreatment/undertreatment. Now is the time for healthcare systems to adopt to innovative solutions!";

  constructor(private blogService: BlogService) { }

  industryCard = IndustryCardComponent;

  ngOnInit() {
    this.getPosts();
    this.getCategories();
  }
  // Accesses blog posts from blogService or returns error

  // getPosts() {
  //   this.blogService.getPosts().subscribe((data) => {
  //     console.log(data.posts);
  //     this.blogList = data.posts;
  //     //this.blogList = [...this.blogList, ...this.blogList, ...this.blogList, ...this.blogList]
  //     this.showList = this.blogList;
  //     this.load();
  //   },
  //     (error) => {
  //       this.errorMessage = error.message;
  //       console.log(error);
  //     })
  // }
  // // Accesses list of category objects from blogService or returns error
  // getCategories() {
  //   this.blogService.getCategories().subscribe((data) => {
  //     console.log(data);
  //     this.categoryList = data.categories;
  //     this.categoryList = this.categoryList.filter(
  //       category => category.name !== "Scriptchain"
  //     );
  //   },
  //     (error) => {
  //       this.errorMessage = error.message;
  //       console.log(error);
  //     })
  // }

  getPosts() {
    this.blogService.getPosts().subscribe((data) => {
      //console.log(data.posts);
      this.blogList = data.posts;
      this.blogList.forEach((elem, index) => {
        if (this.blogList[index].excerpt.length > 100) {
          this.blogList[index].excerpt = this.blogList[index].excerpt.substring(0, 100) + ' ...'
        }
      })
      //this.blogList = [...this.blogList, ...this.blogList]
      this.showList = this.blogList;
      this.load();
    },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      })
  }
  // Accesses list of category objects from blogService or returns error
  getCategories() {
    this.blogService.getCategories().subscribe((data) => {
      //console.log(data);
      this.categoryList = data.categories;
      console.log(this.categoryList);
      this.categoryList = this.categoryList.filter(
        category => category.name !== "Scriptchain Health"
      );
    },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      })
  }

  public selectedCategory = "undefined";

  // Filters list of posts based on chosen category
  public categoryFilter() {
    this.showList = this.blogList.filter(
      blog => Object.values(blog.categories)[0]["name"] === this.selectedCategory
    );
    if (this.selectedCategory === "undefined") {
      this.showList = this.blogList;
      this.description = this.scriptchain_description;
    }
    else {
      this.slug = this.categoryList.filter(category => category.name == this.selectedCategory);
      this.description = this.slug[0].description;
      this.slug = this.slug[0].slug;
    }
    console.log(this.description);

    this.load();
  }

  public load() {
    if (this.showList.length == 0) {
      this.numberOfPages = 1;
      this.currentPage = 1; // at least we have one page
    }
    else {
      this.numberOfPages = Math.ceil(this.showList.length / this.numberPerPage);
      this.currentPage = 1;
    }
    this.updatePage();
    //console.log(this.curList);
  }

  public updatePage() {
    this.curList = this.showList.slice((this.currentPage - 1) * this.numberPerPage, this.currentPage * this.numberPerPage);
    var lowEnd = Math.max(this.currentPage - this.maxLen / 2, 1);
    var highEnd = Math.min(lowEnd + this.maxLen - 1, this.numberOfPages);
    var lowEnd = Math.max(1, highEnd - this.maxLen + 1);
    var list = []
    for (var i = lowEnd; i <= highEnd; i++) {
      list.push(i);
    }
    this.pageList = list;
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });

  }

  public nextPage() {
    if (this.currentPage != this.numberOfPages) {
      this.currentPage += 1;
      this.updatePage();
    }
  }

  public previousPage() {
    if (this.currentPage != 1) {
      this.currentPage -= 1;
      this.updatePage();
    }
  }

  public jumpPage(event) {
    this.currentPage = Number(event.target.innerText);
    this.updatePage();
  }

}
