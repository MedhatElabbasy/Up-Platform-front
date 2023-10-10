import { Component } from '@angular/core';
@Component({
  selector: 'app-main-club',
  templateUrl: './main-club.component.html',
  styleUrls: ['./main-club.component.scss']
})
export class MainClubComponent {
  cities: any[] = [
    { label: 'New York', value: 'New York' },
    { label: 'London', value: 'London' },
    { label: 'Paris', value: 'Paris' },
    // Add more options as needed
  ];

  selectedCity: string = ''; // Initialize with a default value if needed
}
