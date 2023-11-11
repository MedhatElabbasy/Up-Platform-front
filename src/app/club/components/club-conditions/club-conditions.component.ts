import { Component } from '@angular/core';
import { AuthServices } from '../../../auth/services/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-conditions',
  templateUrl: './club-conditions.component.html',
  styleUrls: ['./club-conditions.component.scss']
})
export class ClubConditionsComponent {
  isCheckboxChecked = false;
  isUserLoggedIn = false;

  constructor(private _AuthServices: AuthServices, private _Router: Router) {
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res
    })
  }

  navigate(){
    if(!this.isUserLoggedIn){
      this._Router.navigate(['/auth/login']);
    }else{
      this._Router.navigate(['/club/club-events']);
    }
  }
}
