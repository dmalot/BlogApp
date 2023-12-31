import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private http: HttpService, private route: ActivatedRoute) {}

  user: { name: string; username: string; email: string };

  ngOnInit(): void {
    let username = this.route.snapshot.params['username'];
    this.user = {name: '', username: '', email: ''};
    this.http
      .getUser(username)
      .subscribe(
        (userData: { username: string; email: string; name: string }) => {
          this.user.name = userData.name;
          this.user.email = userData.email;
          this.user.username = userData.username;
        }
      );
  }

  onViewTweets() {
    this.http.getUserPosts(this.user.username).subscribe(userTweets => {
      console.log(userTweets);
    });
  }
}
