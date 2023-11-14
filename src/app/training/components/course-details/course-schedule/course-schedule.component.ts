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
  id1!:any;
  id2!:any;
  id!:any
  courses!:any;
  courseCategory!:any;
  course!:any;
  path!:any;
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
    this.id1=this.route.parent?.snapshot.url[1].path
    this.id2=this.route.parent?.snapshot.url[2].path
    console.log(this.id1);
    console.log(this.id2);

  }

  ngOnInit(): void {
    if(this.id2==0){
      this.getOnlineCourseDetails();
    }
    else if(this.id2==1){
      this.getCourseDetailsByID()
    }else if(this.id2==2){
      this.getPathDetailsByID()
    }
  }


  getOnlineCourseDetails(){
    console.log(this.id1);
    this._trainingService.getAllOnlineCourseDetailsByID(this.id1).subscribe((res:any)=>{
      if(res){
      console.log(res);
      this.courses=res.data.class.zoom_meetings;  
      console.log(this.courses);
       
      }
    })
  }

  getCourseDetailsByID(){
    console.log(this.id1);
    this._trainingService.getAllCourseDetailsByID(this.id1).subscribe((res:any)=>{
      if(res){
      console.log(res);
      this.courses=res.data.chapters;  
      console.log(this.courses); 
      }
    })
  }

 

  getPathDetailsByID(){
    this._trainingService.getAllCourseDetailsByID(this.id1).subscribe((res:any)=>{
      this.courses=res.data.chapters
    })
  }
}
