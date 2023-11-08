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
  id!:any;
  lastVisitedURL!: any;
  course!:any;
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
console.log(this.route.parent?.snapshot.url[1].path);
this.id=this.route.parent?.snapshot.url[1].path

}
  


  ngOnInit(): void {
    this.getCourseDetailsByID()
    
  }


  getCourseDetailsByID() {
  this._trainingService.getAllCourseDetailsByID(this.id).subscribe((res: any) => {
    if (res) {
      console.log(res);
      this.course = res.data;
    }
  });
}

}
