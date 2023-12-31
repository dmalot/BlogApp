import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private storage: LocalStorageService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === 'http://127.0.0.1:8000/api/user/token/') {
      // console.log("Header is not appended for getting token.")
      return next.handle(req);
    }
    else if (req.url === 'http://127.0.0.1:8000/api/user/create/') {
      return next.handle(req);
    }
     else {



      //   this.authService.user.subscribe((userData) => {
      //     // console.log(userData.token)
      //     let header = new HttpHeaders();
      //     let val = 'Token ' + userData.token;
      //     header = header.set('Authorization', val);
      //     console.log(header);
      //     // console.log(userData.token);
      //     const modifiedReq = req.clone({
      //       headers: header
      //     });

      //     console.log(modifiedReq);
      //     console.log(modifiedReq.headers.get('Authorization'))
      //     return next.handle(modifiedReq);

      //   });

      return this.authService.user.pipe(
        take(1),
        exhaustMap((user) => {
          let header = new HttpHeaders();
          let val = 'Token ' + user.token;
          header = header.set('Authorization', val);
          const modifiedReq = req.clone({
            headers: header,
          });
          return next.handle(modifiedReq);
        })
      );
    }
  }
}
