//  Kefan - develop the entire page
import { Component, OnInit } from "@angular/core";
import { BlogService } from "../shared/blogService.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-blog-post-quote",
  templateUrl: "./blog-post-quote.component.html",
  styleUrls: ["./blog-post-quote.component.css"],
})
export class BlogPostQuoteComponent implements OnInit {
  category: any;
  errorMessage: any;
  blogList: any;
  relateList: any;
  slug: any;
  name: string;
  content: any;
  keywords: any;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.params.slug;
    this.getCategory();
    this.getPosts();
  }

  goBack() {
    this.router.navigate(["blog"]);
  }
  getCategory() {
    this.blogService.getSingleCategories(this.slug).subscribe(
      (data) => {
        // console.log(data);
        this.category = data;
        this.name = this.category.name;
        this.keywords = this.name.toLowerCase();
        this.content = this.category.description;
        this.blogService.getKeywords(this.content).subscribe((data) => {
          var arr = data["keywords"];
          if (arr.length < 5) {
            arr.forEach((v, i) => {
              if (this.name.toLowerCase() != v) {
                this.keywords += ", " + v;
              }
            });
          } else {
            arr.forEach((v, i) => {
              var tmp = Math.ceil(arr.length / 4);
              if (i % tmp == 0 && this.name.toLowerCase() != v) {
                this.keywords += ", " + v;
              }
            });
          }
        });
      },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }

  getPosts() {
    this.blogService.getPosts().subscribe(
      (data) => {
        // console.log(data.posts);
        this.blogList = data.posts;
        this.blogList.forEach((elem, index) => {
          if (this.blogList[index].excerpt.length > 50) {
            this.blogList[index].excerpt =
              this.blogList[index].excerpt.substring(0, 50) + " ...";
          }
        });
        // console.log(this.blogList);
        if (this.name !== "Scriptchain Health") {
          this.blogList = this.blogList.filter(
            (blog) => Object.values(blog.categories)[0]["name"] === this.name
          );
        }
        this.relateList = this.blogList.slice(0, 3);
        //this.relateList = [...this.relateList, ...this.relateList, ...this.relateList];
        // console.log(this.relateList);
      },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }
}
