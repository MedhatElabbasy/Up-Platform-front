import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isUserLoggedIn: boolean = false

  constructor(private _AuthServices: AuthServices, private _Router: Router) {
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res

    })
  }

  logout() {
    this._AuthServices.logout()
    this._AuthServices.isUserLoggedIn.next(false)
    this._Router.navigate(['/auth/login'])
    localStorage.removeItem(environment.localStorageName)
  }
}
