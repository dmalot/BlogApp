import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './localstorage.service';
import { RouterModule, Routes } from '@angular/router';
// import { AuthInterceptorService } from './auth-interceptor.service';
import { HttpService } from './http.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthGuard } from './auth-guard.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  {path: 'user/:username', component: UserComponent },
];

@NgModule({
  declarations: [AppComponent, NavBarComponent, LoginComponent, HomeComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    HttpService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
