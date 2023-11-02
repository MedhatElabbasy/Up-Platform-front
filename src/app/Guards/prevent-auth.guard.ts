import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServices } from '../auth/services/auth-services.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreventAuthGuard implements CanActivate {
  constructor(private _AuthServices: AuthServices, private _Router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem(environment.localStorageName) == null) {
        return true
      } else {
        // this._Router.navigate(['home'])
        // return false
        return true
      }
  }

 
  
}
