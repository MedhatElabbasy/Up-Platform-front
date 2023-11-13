import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-course-general-info',
  templateUrl: './course-general-info.component.html',
  styleUrls: ['./course-general-info.component.scss']
})
export class CourseGeneralInfoComponent {
  trainingPaths!: any;
  isLoading: boolean = true
  id1!:any;
  id2!:any;
  lastVisitedURL!: any;
  course!:any;
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
    }
  }


  getOnlineCourseDetails(){
    console.log(this.id1);
    this._trainingService.getAllOnlineCourseDetailsByID(this.id1).subscribe((res:any)=>{
      if(res){
      console.log(res);
      this.course=res.data;  
      console.log(this.course);
       
      }
    })
  }

  getCourseDetailsByID(){
    console.log(this.id1);
    this._trainingService.getAllCourseDetailsByID(this.id1).subscribe((res:any)=>{
      if(res){
      console.log(res);
      this.course=res.data;   
      }
    })
  }

}
