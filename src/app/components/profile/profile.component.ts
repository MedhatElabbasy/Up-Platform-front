import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/services/auth-services.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails: any = {};

    constructor(private authService: AuthServices, private router: Router) {}
  

    ngOnInit() {
      this.getUserDetails();
    }
  
    getUserDetails() {
      this.authService.profile().subscribe(
        (data: any) => {
          this.userDetails = data.data;
          console.log(this.userDetails);
        },
        (error: any) => {
          console.error('Error fetching user details', error);
        }
      );
    }
    

    logout() {
      this.authService.logout();
      this.authService.isUserLoggedIn.next(false)
      localStorage.removeItem(environment.localStorageName)
      sessionStorage.removeItem(environment.localStorageName)
      this.router.navigate(['/auth/login']);
    }
}
