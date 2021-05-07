import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  displayhovercard1() {
    var ele1 = document.getElementById("img1");
    ele1.style.display = "none";
    var ele1 = document.getElementById("img2");
    ele1.style.display = "none";
    var ele3 = document.getElementById("img3");
    ele3.style.display = "none";
    var ele4 = document.getElementById("img4");
    ele4.style.display = "none";
    var ele5 = document.getElementById("hovercard1");
    ele5.style.display = "block";
  }
}
