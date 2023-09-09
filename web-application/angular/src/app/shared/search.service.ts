import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BlogService } from "./blogService.service";
import { Router } from "@angular/router";

export class Search {
  page: string;
  description: string;
  route: string;
}

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private blogService: BlogService, private router: Router) {}

  private searchValue = new BehaviorSubject<string>("");
  currentSearchValue = this.searchValue.asObservable();
  private addedBlog = false;
  private addedPages = false;
  // Stores the search results
  private searchResult: Search[] = [
    {page:"Instagram",description:"",route:"https://www.instagram.com/scriptchainhealth/"},
    {page:"Facebook",description:"",route:"https://www.facebook.com/ScriptChain-108456297282307"},
    {page:"Twitter",description:"",route:"https://twitter.com/scriptchain1"},
    {page:"LinkedIn",description:"",route:"https://www.linkedin.com/company/scriptchain/mycompany/"},
  ];

  private blogList;

  getAll(): Search[] {
    this.addBlog();
    this.addPages();
    return this.searchResult;
  }
  // when the search input is empty it showcases the 3 favorited
  getFavorite(): Search[] {
    return [
      { page: "Home", description: "", route: "home" },
      {
        page: "Who we are",
        description: "",
        route: "whoweare",
      },
      {
        page: "Contact Us",
        description: "",
        route: "contact-us",
      },
    ];
  }
  addPages() {
    if (!this.addedPages) {
      for (let i = 0; i < this.router.config.length - 1; i++) {
        if (this.router.config[i].data.searchable) {
          let tempName = this.router.config[i].data.desc;
          let tempDesc = "";
          let tempId = this.router.config[i].path;
          let blogList: Search = {
            page: tempName,
            description: tempDesc,
            route: `${tempId}`,
          };
          this.searchResult.push(blogList);
        }
      }
    }
    this.addedPages = true;
  }
  addBlog() {
    this.blogService.getPosts().subscribe((data) => {
      // adds the blogpost to search results does it once so it will not dublicate the contentz
      if (!this.addedBlog) {
        for (let i = 0; i < data.posts.length; i++) {
          let tempName = data.posts[i].title;
          let tempDesc = data.posts[i].excerpt.slice(3,-5);
          let tempId = data.posts[i].ID;
          let blogList: Search = {
            page: tempName,
            description: tempDesc,
            route: `blog-post/${tempId}`,
          };
          this.searchResult.push(blogList);
        }

        this.addedBlog = true;
      }
    });
  }

}
