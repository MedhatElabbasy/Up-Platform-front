import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/services/auth-services.service';
import { PaymentService } from '../../../app/core/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  cads: number = 0;
  userDetails: any = {};
  userDetailsString: string = '';

  constructor(
    private authService: AuthServices,
    private router: Router,
    private PaymentService: PaymentService
  ) {}

  ngOnInit() {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      this.userDetails = userDetails;
      console.log('User Details:', this.userDetails.name);
    } else {
      console.log('User details not found in local storage');
    }
    this.getWalletCredit();
  }

  getWalletCredit() {
    this.PaymentService.getWalletCredit().subscribe((res: any) => {
      console.log(res);
      this.cads = res.cap;
    });
  }

  logout() {
    this.authService.logout();
    this.authService.isUserLoggedIn.next(false);
    localStorage.removeItem(environment.localStorageName);
    localStorage.removeItem(environment.localStorageName);
    sessionStorage.removeItem('userDetails');
    localStorage.removeItem('userDetails');
    this.router.navigate(['/auth/login']);
  }
}
