import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Post } from '../post';
import { Patient } from '../shared/patient.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPosts: any[];
  autoCompleteList: any[];
  filterSelection: string;

  availableFilters: object[] = [
    { "name": "fname", ID: "D1", "checked": true, "displayName": "First Name" },
    { "name": "email", ID: "D2", "checked": false, "displayName": "Email Address" },
    { "name": "lname", ID: "D3", "checked": false, "displayName": "Last Name" }
  ];

  //To add a new filter, add a json object in availableFilters
  // & also add a switch case in filterCategoryList

  @ViewChild('autocompleteInput',{static: true}) autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.filterSelection = "fname"
    this.dataService.getPosts().subscribe(posts => {
      this.allPosts = posts

    });

    //triggered when mycontol value changes wrt observable
    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput, this.filterSelection);
    })
  }

  private autoCompleteExpenseList(input, searchParam) {
    let categoryList = this.filterCategoryList(input, searchParam)
    //Setting a search term for all the objects in autocompletelist -
    // - is necessary for displaying dynamically changing terms
    // based on filters in searchbar
    var x;
    for (x of categoryList) {
      if (typeof x === 'object' && x !== null) {
        //frontend has email, backend has Email
        //hence small correction code, when resolves, delete ifelse condition
        // and just leave the condition in else statement
        if (searchParam.toLowerCase() === "email") {
          x["searchTerm"] = x["Email"];
        } else { x["searchTerm"] = x[searchParam]; }
      }
    }
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val, searchParam) {
    //category is actually the autocomplete search results
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    //switch case is to select search filter
    //returns a list of patient objectts that can match
    switch (searchParam) {
      case "fname":
        return val ? this.allPosts.filter(s => s.fname.toLowerCase().indexOf(val.toLowerCase()) != -1)
          : this.allPosts;
      case "email":
        return val ? this.allPosts.filter(s => s.Email.toLowerCase().indexOf(val.toLowerCase()) != -1)
          : this.allPosts;
      case "lname":
        return val ? this.allPosts.filter(s => s.lname.toLowerCase().indexOf(val.toLowerCase()) != -1)
          : this.allPosts;

    }
  }

  displayFn(post: Patient) {
    switch (this.filterSelection) {
      case "fname": let k = post ? post.fname : post;
        return k;
      case "email": let l = post ? post.email : post;
        return k;
    }
  }

  //search param is the filter of search
  filterPostList(event, searchParam) {
    console.log(this.myControl);
    var posts = event.source.value;

    if (!posts) {
      this.dataService.searchOption = [];
    }
    else {
      console.log("not")
      this.myControl.disable();
      this.dataService.searchOption.push(posts);
      this.dataService.searchOption.push(this.filterSelection);
      this.onSelectedOption.emit(this.dataService.searchOption)
    }

    //this.focusOnPlaceInput();



  }


  removeOption(option) {
    this.myControl.enable();
    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0)
      this.dataService.searchOption.splice(index, 1);
    //this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.dataService.searchOption);
  }

  /*focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }*/


}

