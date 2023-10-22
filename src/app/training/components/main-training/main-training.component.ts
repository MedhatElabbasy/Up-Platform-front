import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { TrainingService } from '../../Services/training.service';

@Component({
  selector: 'app-main-training',
  templateUrl: './main-training.component.html',
  styleUrls: ['./main-training.component.scss']
})
export class MainTrainingComponent implements OnInit {
  constructor(private _AuthServices: AuthServices, private _TrainingService: TrainingService) {
    // _AuthServices.isUserLoggedIn.next(false)
  }

  ngOnInit(): void {
    // this.getAllCourses()
  }


  getAllCourses() {
    // this._TrainingService.getAllCourses().subscribe((res) => {
    //   console.log(res);

    // })
  }
}
