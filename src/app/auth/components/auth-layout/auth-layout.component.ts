import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth-services.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  constructor(private _AuthServices: AuthServices) {
    _AuthServices.isAuth.next(true)
  }
}
