import { Component, OnInit } from "@angular/core";
import { BlogCardComponent } from "../shared/components/blog-card/blog-card.component";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit {

  ngOnInit() {}
  blogCard = BlogCardComponent;
  categoryList = [
    { value: "updates", name:"Scriptchain Updates"},
    { value: "ai", name:"AI"},
    { value: "invest", name:"Investing in Healthcare"},
    { value: "patient", name:"Patient Outcomes"},
    { value: "scholar", name:"Scholarly Articles"},
    { value: "industry", name:"What the Industry is Saying"}
  ];
  


}

