import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  carouselItems: string[] = [
    'assets/images/home/KingAbdulazizUniversity.svg',
    'assets/images/home/KingAbdulazizUniversity.svg',
    'assets/images/home/KingAbdulazizUniversity.svg',
    // Add more image URLs here
  ];
}