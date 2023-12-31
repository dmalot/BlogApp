import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { LocalStorageService } from '../localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: LocalStorageService,
    private httpService: HttpService,
    private http: HttpClient
  ) {}

  onLogin(loginform: NgForm) {
    const username = loginform.value.username;
    const password = loginform.value.password;

    this.authService.userLogin(username, password);
    // this.router.navigate(['home']);
  }

  onClickLogin() {
    this.login = true;
  }

  onClickRegister() {
    this.login = false;
  }

  onLogout() {
    this.storage.remove('userData');
    this.authService.userLogout();
  }

  onRegister(registerform: NgForm) {
    const username = registerform.value.username;
    const email = registerform.value.email;
    const password = registerform.value.password;
    const name = registerform.value.name;

    this.authService.userRegister(username, email, name, password);
  }
}
