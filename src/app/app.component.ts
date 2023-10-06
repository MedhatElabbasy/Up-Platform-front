import { Component } from '@angular/core';
import { AuthServices } from './auth/services/auth-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EntrepreneursClub';
  isUserLoggedIn = false
  constructor(private _AuthServices: AuthServices) {
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res

    })
  }
}
