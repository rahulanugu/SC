// Sammy - update blog images and category text from blogservice
// Stephanie - updated to access single posts with id via Wordpress API
// Kefan - updated to get related posts and go back function
// Siheng - Fixed the keywords display & handled the image responsiveness

import {
  Component,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { BlogService } from "../shared/blogService.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { from } from "rxjs";

@Component({
  selector: "app-blog-post",
  templateUrl: "./blog-post.component.html",
  styleUrls: ["./blog-post.component.css"],
})
export class BlogPostComponent implements OnInit {
  @ViewChild("contentContainer", { static: true }) containerRef: ElementRef;
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
  keywords: any;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private renderer: Renderer2
  ) {}

  // Stores ID for post from URL and accesses corresponding post

  ngOnInit() {
    this.blogID = this.route.snapshot.params.id;
    this.getSinglePosts();
    this.getPosts();
  }

  // Accesses single blog posts from blogService using ID or returns error
  getSinglePosts() {
    this.blogService.getSinglePosts(this.blogID).subscribe(
      (data) => {
        this.singlePosts = data;
        console.log(this.singlePosts);
        this.imgURL = this.singlePosts.post_thumbnail.URL;
        this.title = this.singlePosts.title;
        this.authorName = this.singlePosts.author.name;
        this.date = this.singlePosts.date;
        this.content = this.singlePosts.content;
        this.category = Object.values(this.singlePosts.categories)[0]["name"];

        // concat the tags to be the keywords
        this.keywords = "";
        for (let tag in this.singlePosts.tags) {
          this.keywords += this.singlePosts.tags[tag].name + " | ";
        }
        this.keywords = this.keywords.substring(0, this.keywords.length - 3);

        // Create a new p element to display the content
        const p = this.renderer.createElement("p");
        p.classList.add("text-wrap", "mt-5");
        p.innerHTML = this.content;
        this.renderer.appendChild(this.containerRef.nativeElement, p);

        // this.blogService.getKeywords(this.content).subscribe((data) => {
        //   var arr = data["keywords"];
        //   if (arr.length < 5) {
        //     arr.forEach((v, i) => {
        //       if (this.category.toLowerCase() != v) {
        //         this.keywords += ", " + v;
        //       }
        //     });
        //   } else {
        //     arr.forEach((v, i) => {
        //       var tmp = Math.ceil(arr.length / 4);
        //       if (i % tmp == 0 && this.category.toLowerCase() != v) {
        //         this.keywords += ", " + v;
        //       }
        //     });
        //   }
        // });
      },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }
  goBack() {
    this.router.navigate(["blog"]);
  }

  getPosts() {
    this.blogService.getPosts().subscribe(
      (data) => {
        console.log(data.posts);
        this.blogList = data.posts;
        this.blogList = this.blogList.filter(
          (blog) => Object.values(blog.categories)[0]["name"] === this.category
        );
        this.blogList.forEach((elem, index) => {
          if (this.blogList[index].excerpt.length > 50) {
            this.blogList[index].excerpt =
              this.blogList[index].excerpt.substring(0, 50) + " ...";
          }
        });
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
      }
    );
  }

  // Access
}
