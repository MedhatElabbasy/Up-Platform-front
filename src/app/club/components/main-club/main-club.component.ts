import { Component } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { PaginationInstance } from 'ngx-pagination';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from 'src/app/training/Services/training.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-club',
  templateUrl: './main-club.component.html',
  styleUrls: ['./main-club.component.scss']
})
export class MainClubComponent {
  // cities: any[] = [
  //   { label: 'New York', value: 'New York' },
  //   { label: 'London', value: 'London' },
  //   { label: 'Paris', value: 'Paris' },
  //   // Add more options as needed
  // ];

  constructor(private _Router: Router){

  }
 next(){
  this._Router.navigate(['/club/club-conditions'])
 }
}
