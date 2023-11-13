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
  id1!:any;
  id2!:any;
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
    this.isLoading=true
    console.log(this.id1);
    this._trainingService.getAllOnlineCourseDetailsByID(this.id1).subscribe((res:any)=>{
      if(res){
      console.log(res);
      this.isLoading=false
      this.course=res.data;  
      console.log(this.course);
       
      }
    })
  }

  getCourseDetailsByID(){
    this.isLoading=true
    console.log(this.id1);
    this._trainingService.getAllCourseDetailsByID(this.id1).subscribe((res:any)=>{
      if(res){
        this.isLoading=false
      console.log(res);
      this.course=res.data;   
      }
    })
  }

}
