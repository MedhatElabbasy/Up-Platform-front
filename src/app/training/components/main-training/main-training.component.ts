import { Component } from '@angular/core';
import { AuthServices } from 'src/app/auth/services/auth-services.service';

@Component({
  selector: 'app-main-training',
  templateUrl: './main-training.component.html',
  styleUrls: ['./main-training.component.scss']
})
export class MainTrainingComponent {
  constructor(private _AuthServices: AuthServices) {
    // _AuthServices.isUserLoggedIn.next(false)
  }
}
