import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SearchService } from "../shared/search.service";
import { Search } from "../shared/search.service";

@Component({
  selector: "app-landing-page-header",
  templateUrl: "./landing-page-header.component.html",
  styleUrls: ["./landing-page-header.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageHeaderComponent implements OnInit {
  isActive = false;
  searchValue: any;
  searchValueMobile: any;
  searchTerm: Search[] = [];

  constructor(private searchService: SearchService) {}
  // Displays favorites of object
  ngOnInit() {
    this.searchValue=""
    this.searchTerm = this.searchService.getFavorite();
  }

  effect() {
    this.isActive = !this.isActive;
    if (this.isActive) window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }
  // Searches through the object if it matches, if the input is empty displays favorites
  SearchValue() {
    if (this.searchValue == "") {
      this.ngOnInit()
    } else {
      this.searchTerm = this.searchService.getAll().filter((res) => {
        return (res.page.toLowerCase().includes(this.searchValue.toLowerCase()))||(res.description.toLowerCase().includes(this.searchValue.toLowerCase()));
      });
    }
  }
  // Same but for mobile
  SearchValueMobile() {
    if (this.searchValueMobile == "") {
      this.searchTerm =[]
    } else {
      this.searchTerm = this.searchService.getAll().filter((res) => {
        console.table(this.searchTerm)
        return res.page.toLowerCase().includes(this.searchValueMobile.toLowerCase());
      });
    }
  }
}
