import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Patient } from './shared/patient.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //The array that contains all the options selected from drop down from search bar
  searchOption=[]

  public postsData: any[]
  postUrl : string = environment.serverUrl+"patient"; 


  constructor(
    private http: HttpClient
  ) { }


  getPosts(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.postUrl+environment.param);  
  }

  //gives the search results of posts based on search options
  filteredListOptions(filterParam) {
    let posts = this.postsData;
    console.log("the postsdata is "+posts)
    console.log("Search option is"+this.searchOption)
    this.searchOption.pop();
    console.log("Search option after popping "+this.searchOption)

        let filteredPostsList = [];
        switch(filterParam) {
          case "fname":
            console.log("fname being checked")
            for (let post of posts) {
              for (let options of this.searchOption) {
                  if (options.fname === post.fname) {
                    filteredPostsList.push(post);
                  }
              }
            }
            console.log(filteredPostsList);
            return filteredPostsList;
          case "email":
            console.log("email being checked")
            console.log(posts)
            console.log(this.searchOption)
            for (let post of posts) {
              for (let options of this.searchOption) {
                  if (options.Email === post.Email) {
                    filteredPostsList.push(post);
                  }
              }
            }
            console.log(filteredPostsList);
            return filteredPostsList;
          case "lname":
            console.log("lname being checked")
            for (let post of posts) {
              for (let options of this.searchOption) {
                  if (options.lname === post.lname) {
                    filteredPostsList.push(post);
                  }
              }
            }
            console.log(filteredPostsList);
            return filteredPostsList;
        }
  }
}
