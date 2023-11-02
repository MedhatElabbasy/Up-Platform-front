import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/services/auth-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    constructor(private authService: AuthServices, private router: Router) {}
  
    logout() {
      this.authService.logout();
    }
}
