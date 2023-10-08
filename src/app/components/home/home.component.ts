import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  carouselItems: string[] = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    // Add more image URLs here
  ];
}
