import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  fetchPosts() {
    return this.http.get('http://127.0.0.1:8000/api/tweet/');
  }

  getUser(username: string) {


    return this.http.get('http://127.0.0.1:8000/api/user/',
    {params: new HttpParams().set('username', username)})

  }

  createPost(postData: {user: string, text: string}) {

    this.http.post('http://127.0.0.1:8000/api/tweet/',postData).subscribe(res => {
      console.log(res);
    })

  }

  getUserPosts(username: string) {

    return this.http.get('http://127.0.0.1:8000/api/tweet/user_tweets/', {
      params: new HttpParams().set('username', username)
    })

  }
}
