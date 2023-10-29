import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  courseInfo!:any
constructor(private _trainingServices:TrainingService , private router: Router){
this._trainingServices.getAllTrainingPaths().subscribe((res:any)=>{
  console.log(res);
   this.courseInfo =res.data[0];
   this._trainingServices.bundleSubscription.next(this.courseInfo)
})
}

redirectBio(){
  this.router.navigate(['/biography/',this.courseInfo.user_id])
}
}
