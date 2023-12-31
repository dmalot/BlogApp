import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy, DoCheck {
  private userSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {}

  isLoggedIn = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      console.log(user);
      this.isLoggedIn = this.authService.isLoggedIn;
      console.log(this.authService.isLoggedIn);
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.authService.user.subscribe((user) => {
  //     console.log(user);
  //     this.isLoggedIn = this.authService.isLoggedIn;
  //     console.log(this.authService.isLoggedIn);
  //   });
  // }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngDoCheck(): void {

    this.authService.user.subscribe((user) => {
      console.log(user);
      this.isLoggedIn = this.authService.isLoggedIn;
      console.log(this.authService.isLoggedIn);
    });

  }

  onHome() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['home'])
    }
    else {
      this.router.navigate(['/'])
    }
  }

  onLogout() {
    this.authService.userLogout();
  }
}
