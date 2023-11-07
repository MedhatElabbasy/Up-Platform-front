import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { AuthServices } from '../../../app/auth/services/auth-services.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // userDetails: any = {}
  constructor(
    private AuthService: AuthServices,
    private _Router: Router,
  ) {
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
  }
  carouselItems: string[] = [
    'assets/images/home/KingAbdulazizUniversity.svg',
    'assets/images/home/KingAbdulazizUniversity.svg',
    'assets/images/home/KingAbdulazizUniversity.svg',
    // Add more image URLs here
  ];


  // ngOnInit() {
  //   this.getUserDetails();
    
  // }

  // getUserDetails() {
  //   this.AuthService.profile().subscribe(
  //     (data: any) => {
  //       this.userDetails = data.data;
  //       console.log(this.userDetails);
  //       console.log(this.userDetails.phone_verify)
  //   // if(this.userDetails.phone_verify==="0"){
  //   //   this._Router.navigate(['/auth/verify-account'])
  //   // }
  //     },
  //     (error: any) => {
  //       console.error('Error fetching user details', error);
  //     }
  //   );
  // }
}
