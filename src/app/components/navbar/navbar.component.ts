import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { TrainingService } from 'src/app/training/Services/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userDetails: any = {};
  cartItemsNum: any = [];
  userDetailsString: string = '';
  isUserLoggedIn: boolean = false;
  cartItemsSubscription!: Subscription;

  constructor(private _AuthServices: AuthServices, public _Router: Router, private TrainingService: TrainingService,) {
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res
    });
    this.subscribeToCartItems();
  }

  ngOnInit() {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      this.userDetails = userDetails;
      if(this.isUserLoggedIn){
        this.getItemsNum();
      }
    } else {
      console.log('User details not found in local storage');
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

  ngOnDestroy() {
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
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
  
