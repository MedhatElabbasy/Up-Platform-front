import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../../Services/training.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {
  trainingPaths!: any;
  isLoading: boolean = true
  id1!:any;
  id2!:any;
  course!:any;
  lastVisitedURL!:any
  courses!:any;
  courseCategory!:any;
  rootParent!:any;
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
     this.id1=params['id1']
     this.id2=params['id2']
      console.log(params['id1']) 
       console.log(params['id2']) //log the value of id
    });
    this.  getCourseDetailsByID()
  }

  

  getCourseDetailsByID(){
    this._trainingService.getAllCourseDetailsByID(this.id1).subscribe((res:any)=>{
      if(res){
      console.log(res);
      this.courses=res.data;
      this.courseCategory=res.data.course_category;
      console.log(this.courseCategory);
      }
    })
  }
}
