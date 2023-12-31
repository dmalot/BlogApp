import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, exhaust, exhaustMap, take, tap } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import { User } from './models/user.model';

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  isLoggedIn = false;

  autoLogin() {
    const userData: {
      email: string;
      username: string;
      name: string;
      token: string;
    } = JSON.parse(this.storage.get('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.email,
      userData.name,
      userData.token
    );
    this.user.next(loadedUser);
    this.isLoggedIn = true;
  }

  userLogin(username: string, password: string) {
    this.http
      .post('http://127.0.0.1:8000/api/user/token/', { username, password })
      .pipe(
        tap((resData: User) => {
          const user = new User(resData.username, resData.email, resData.name, resData.token);
          this.user.next(user);
          this.storage.set('userData', JSON.stringify(resData));
        })
      )
      .subscribe((resData) => {
        console.log(resData);
        this.isLoggedIn = true;
        console.log('user is ' + this.isLoggedIn);
        this.router.navigate(['home']);
      });
  }

  userRegister(username: string, email: string, name: string, password: string) {

    this.http
      .post('http://127.0.0.1:8000/api/user/create/', {
        username,
        email,
        password,
        name,
      })
      .pipe(take(2), exhaustMap((user) => {

        return this.http.post('http://127.0.0.1:8000/api/user/token/', {username, password})
      }))
      .pipe(tap((userData: {username: string, email: string, name: string, token: string}) => {
        const user = new User(userData.username, userData.email, userData.name, userData.token);
        this.user.next(user);
        this.storage.set('userData', JSON.stringify(userData))
      }))
      .subscribe(data => {
        console.log(data);
        this.isLoggedIn = true;
        this.router.navigate(['home']);
      })

  }

  userLogout() {
    this.isLoggedIn = false;
    this.user.next(null);
    this.storage.remove('userData');
    this.router.navigate(['/']);
  }
}
