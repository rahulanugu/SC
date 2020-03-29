import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Patient } from './shared/patient.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //The array that contains all the options selected from drop down from search bar
  searchOption=[]

  public postsData: Patient[]
  postUrl : string = "http://localhost:8080/patient"; 

  constructor(
    private http: HttpClient
  ) { }


  getPosts(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.postUrl);  
  }

  //gives the search results of posts based on search options
  filteredListOptions() {
    console.log("Invoked")
    let posts = this.postsData;
        let filteredPostsList = [];
        for (let post of posts) {
            for (let options of this.searchOption) {
                if (options.fname === post.fname) {
                  filteredPostsList.push(post);
                }
            }
        }
        console.log(filteredPostsList);
        return filteredPostsList;
  }
}
