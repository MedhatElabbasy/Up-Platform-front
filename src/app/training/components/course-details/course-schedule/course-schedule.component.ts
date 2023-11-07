import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.scss']
})
export class CourseScheduleComponent {
  trainingPaths!: any;
  isLoading: boolean = true
  id!:any;
  courses!:any;
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
    this.id=this.route.parent?.snapshot.url[1].path
  }

  ngOnInit(): void {
    this.getCourseDetailsByID()
  }


  getCourseDetailsByID(){
    this._trainingService.getAllCourseDetailsByID(this.id).subscribe((res:any)=>{
      if(res){
      console.log(res);
      this.courses=res.data;
      }
    })
  }
}
