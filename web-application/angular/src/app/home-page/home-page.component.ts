import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../post';
import { Patient } from '../shared/patient.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  post: Patient[]
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe(posts => {
      this.post = posts
      this.dataService.postsData = posts
    });
  }

  onSelectedOption(e) {
    var k = e[1];
    this.getFilteredExpenseList(k);
  }

  getFilteredExpenseList(searchFilter) {
    if (this.dataService.searchOption.length > 0)
      this.post = this.dataService.filteredListOptions(searchFilter);
    else {
      this.post = this.dataService.postsData;
    }

    //console.log(this.post)
  }

}

