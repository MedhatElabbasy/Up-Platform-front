import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/services/auth-services.service';
import { PaymentService } from '../../../app/core/services/payment.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cads: number = 0;
  userDetails: any = {};

    constructor(private authService: AuthServices, private router: Router, private PaymentService:PaymentService) {}
  

    ngOnInit() {
      this.getUserDetails();
      this.getWalletCredit();
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
    
    getWalletCredit() {
      this.PaymentService.getWalletCredit().subscribe((res: any) => {
        console.log(res);
        this.cads = res.cap;
      });
    }
    
    logout() {
      this.authService.logout();
      this.authService.isUserLoggedIn.next(false)
      localStorage.removeItem(environment.localStorageName)
      sessionStorage.removeItem(environment.localStorageName)
      this.router.navigate(['/auth/login']);
    }
}
