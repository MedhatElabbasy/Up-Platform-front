import { Component } from '@angular/core';
import { AuthServices } from './auth/services/auth-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EntrepreneursClub';
  isLogin = false
  constructor(private _AuthServices: AuthServices) {
    _AuthServices.isAuth.subscribe((res) => {
      this.isLogin = res

    })
  }
}
