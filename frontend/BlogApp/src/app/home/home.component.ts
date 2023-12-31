import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { User } from '../models/user.model';
import { Tweet } from '../models/tweet.model';
import { HttpService } from '../http.service';
import { LocalStorageService } from '../localstorage.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpService,
    private router: Router,
    private authService: AuthService,
  ) {}
  postText: string = null;

  postData: {user: string, text: string} = {user: '', text: ''};




  // tweet1: Tweet = { user: this.user1, id: 1, text: 'This is my first tweet.' };
  // tweet2: Tweet = { user: this.user1, id: 2, text: 'This is my second tweet.' };
  // tweet3: Tweet = { user: this.user1, id: 3, text: 'This is my third tweet.' };

  tweets = [];

  ngOnInit(): void {



    this.http.fetchPosts().subscribe((resData: Array<Object>) => {

      for (const i in resData) {
        this.tweets.push(resData[i])
      }
    });
  }

  onViewUser(username: string) {




    this.router.navigate(['user', username])

  }

  onCreatePost() {

    this.authService.user.subscribe(userData => {

      this.postData.text = this.postText;
      this.postData.user = userData.username;

      this.http.createPost(this.postData);
      this.postText = '';

    })

  }
}
