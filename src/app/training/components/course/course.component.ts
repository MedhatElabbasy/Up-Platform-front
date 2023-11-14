import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  
  trainingPaths!: any;
  isLoading: boolean = true
  id!:number;
  path!:any;
  pathID=2
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
    this.route.params.subscribe((res:any) => {
      console.log(res)
      this.id=res.id
    });
  }

 

  ngOnInit(): void {
    this.getAllTrainingPaths()
  }

  getAllTrainingPaths() {
    this.isLoading = true
    this._trainingService.getAllTrainingPaths().subscribe((res) => {
      console.log(res);
      if (res) {
        this.trainingPaths = res.data;
        console.log(this.trainingPaths);
        this.isLoading = false
       this.trainingPaths.forEach((ele:any)=>{
        if(ele.id == this.id){
          console.log(ele);
          this.path=ele;
          this._trainingService.bundleSubscription.next(this.path)
        }
       })
      }
    });
  }


redirectBio(){
  this.router.navigate(['/biography/',this.path.user_id])
}

next(id:number){
  console.log(id);
  console.log(this.pathID);
  this.router.navigate(['/course-details',id , this.pathID])

}

}
