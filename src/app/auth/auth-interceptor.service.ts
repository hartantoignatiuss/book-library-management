import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const clonedReq = req.clone();
    // const clonedReq = req.clone({
    //   headers: req.headers.append('Basic','AIzaSyBbnO0AKhQIqlUEIHThXRcx72VGsUjBIb0')
    // });

    return next.handle(clonedReq);
  }

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   return this.authService.userSubject.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       if (!user) return next.handle(req);
  //       const modifiedReq = req.clone({
  //         params: new HttpParams().set('auth', user.token || '{}'),
  //       });
  //       return next.handle(modifiedReq);
  //     })
  //   );
  // }
}
