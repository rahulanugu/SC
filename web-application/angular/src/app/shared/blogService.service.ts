// Created by Sammy - access to default blog data
// Stephanie - enabled access to Wordpress API to integrate blogposts into landing page (started 12/16)
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class BlogService {
    private blogUrl = "http://scriptchainhealthblog.com/";
    constructor(private http: HttpClient) { }

    // Accesses blog posts via GET request to Wordpress API
    getPosts() {
      const url = `${this.blogUrl}/wp-json/wp/v2/posts`
      return this.http.get(url).pipe(catchError(this.errorHandler))
    }

    // Accesses list of category objects via GET request to Wordpress API
    getCategories() {
      const url = `${this.blogUrl}/wp-json/wp/v2/categories`
      return this.http.get(url).pipe(catchError(this.errorHandler))
    }

    // Accesses single post from Wordpress API using id
    getSinglePosts(id: any) {
      const url = `${this.blogUrl}/wp-json/wp/v2/posts/${id}`
      return this.http.get(url).pipe(catchError(this.errorHandler))
    }

    errorHandler(error: HttpErrorResponse) {
      return new Observable((observer: Observer<any>) => {
        observer.error(error);
      })
    }
}
