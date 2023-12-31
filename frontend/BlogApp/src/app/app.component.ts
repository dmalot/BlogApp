import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  // title = 'BlogApp';

  // loggedIn = false;

  // onUserLogin() {
  //   this.loggedIn = true;
  // }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
