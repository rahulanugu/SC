// Created by Sammy - access to default blog data
// Stephanie - enabled access to Wordpress API to integrate blogposts into landing page
// Kefan - enabled access to single category
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class BlogService {
  private blogUrl = "scriptchainhealthblog.com";
  blogPosts;
  blogCategories;
  singlePost;

  //https://public-api.wordpress.com/rest/v1.1/sites/scriptchainhealthblog.com/posts
  constructor(private http: HttpClient) { }

  // Accesses blog posts via GET request to Wordpress API
  getPosts() {
    console.log("getting posts");
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/${this.blogUrl}/posts`;
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  // Accesses list of category objects via GET request to Wordpress API
  getCategories() {
    console.log("getting categories")
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/${this.blogUrl}/categories`;
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  // Accesses single category from Wordpress API using slug
  getSingleCategories(slug: any) {
    console.log("getting single category");
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/${this.blogUrl}/categories/slug:${slug}`;
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  // Accesses single post from Wordpress API using id
  getSinglePosts(id: any) {
    console.log("getting single post");
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/${this.blogUrl}/posts/${id}`;
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  readonly baseURL = environment.serverUrl + "/blog_service";

  getKeywords(content) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("content", content);
    return this.http.get(this.baseURL + `/keywordSelection` + environment.param, { params: queryParams });
  }

  errorHandler(error: HttpErrorResponse) {
    return new Observable((observer: Observer<any>) => {
      console.log("there is an error");
      observer.error(error);
    })
  }
}
