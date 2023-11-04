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
  userDetails: any = {};
  isUserLoggedIn: boolean = false

  constructor(private _AuthServices: AuthServices, public _Router: Router) {
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res

    })
  }

  
  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this._AuthServices.profile().subscribe(
      (data: any) => {
        this.userDetails = data.data;
        // console.log(this.userDetails);
      },
      (error: any) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  // logout() {
  //   this._AuthServices.logout();
  //   this._AuthServices.isUserLoggedIn.next(false)
  //   localStorage.removeItem(environment.localStorageName)
  //   this._Router.navigate(['/auth/login']);
  // }
}
