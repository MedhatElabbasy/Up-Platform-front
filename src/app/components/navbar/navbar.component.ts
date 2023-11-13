import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { TrainingService } from 'src/app/training/Services/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  userDetails: any = {};
  cartItemsNum: any = [];
  userDetailsString: string = '';
  isUserLoggedIn: boolean = false;
  cartItemsSubscription!: Subscription;

  constructor(private _AuthServices: AuthServices, public _Router: Router, private TrainingService: TrainingService,) {
    this._AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res;
      if (this.isUserLoggedIn) {
        this.getItemsNum();
      }
      this.getUserDetails();
    });
    this.subscribeToCartItems();
  }

  getUserDetails() {
    this._AuthServices.profile().subscribe(
      (data: any) => {
        this.userDetails = data.data;
      },
      (error: any) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
  }

  getItemsNum() {
    this.TrainingService.getCartItems().subscribe((res: any) => {
      this.cartItemsNum = res.count;
      console.log(res.data);
    });
  }

  subscribeToCartItems() {
    this.cartItemsSubscription = this.TrainingService.getCartItems().subscribe((res: any) => {
      this.cartItemsNum = res.count;
      console.log(res.count);
    });
  }
}
