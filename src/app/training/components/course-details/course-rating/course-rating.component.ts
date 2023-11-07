import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-course-rating',
  templateUrl: './course-rating.component.html',
  styleUrls: ['./course-rating.component.scss']
})
export class CourseRatingComponent {
  trainingPaths!: any;
  isLoading: boolean = true
  id!:any;
  course!:any;
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
    this.id=this.route.parent?.snapshot.url[1].path
  }

  ngOnInit(): void {
    this.getCourseDetailsByID()
  }


  getCourseDetailsByID(){
    this.isLoading=true;
    this._trainingService.getAllCourseDetailsByID(this.id).subscribe((res:any)=>{
      if(res){
        this.isLoading=false
      console.log(res);
      this.course=res.data;
      }
    })
  }
}
