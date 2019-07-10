import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

/**
 * Testing connection to couchDB
 * (currently unused file)
 */
@Injectable({
  providedIn: 'root'
})

export class DbService {

  // private _couchDBUrl = "http://localhost:5984/test/89cd0c4c37a3cb71c498c6c7f80014ee";

  url = 'http://localhost:4000/db';
  
  constructor(private http:HttpClient) {}

  addUser(_username, _password){
    const obj = {
      username: _username,
      password: _password
    };
    console.log("user obj: ", obj);
    this.http.post(`${this.url}/add`, obj).subscribe(res => console.log('Done'));
  }

  /*httpOptions={
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
    })
  }

  getDocs(){
    return this._http.get(this._couchDBUrl, this.httpOptions);
  }*/
}
