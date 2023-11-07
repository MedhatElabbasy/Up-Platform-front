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
  userDetailsString: string = '';
  isUserLoggedIn: boolean = false

  constructor(private _AuthServices: AuthServices, public _Router: Router) {
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res

    })
  }

  
  ngOnInit() {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      this.userDetails = userDetails;
      console.log('User Details:', this.userDetails.name);
    } else {
      console.log('User details not found in local storage');
    }
  }
  }

  // getUserDetails() {
  //   this._AuthServices.profile().subscribe(
  //     (data: any) => {
  //       this.userDetails = data.data;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching user details', error);
  //     }
  //   );
  // }
  
