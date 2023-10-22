import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-online-courses',
  templateUrl: './online-courses.component.html',
  styleUrls: ['./online-courses.component.scss']
})
export class OnlineCoursesComponent implements OnInit {
  zoomCourses: any = []
  constructor(private _TrainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.getAllCourses()
  }
  getAllCourses() {
    this._TrainingService.getAllOnlineClasses().subscribe((res) => {
      console.log(res);
      this.zoomCourses = res.data
    })
  }
}
