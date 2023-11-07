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
  id!:number;
  course!:any;
  lastVisitedURL!:any
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
   
  }
}
