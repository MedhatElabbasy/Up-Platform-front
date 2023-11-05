import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(environment.localStorageName);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log("aloooo");
      
    }

    return next.handle(request);
  }
}
