import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../../Services/training.service';
import { log } from 'tone/build/esm/core/util/Debug';

@Component({
  selector: 'app-selected-path',
  templateUrl: './selected-path.component.html',
  styleUrls: ['./selected-path.component.scss']
})
export class SelectedPathComponent {
id!:number;
title!:string;
trainingPaths: [] = [];
course!:any;
constructor( private router: Router ,private route: ActivatedRoute , private _trainingService:TrainingService){
  this.route.params.subscribe((res:any) => {
    console.log(res)
    this.id=res.id
  });
this.getAllTrainingPaths();
}

getAllTrainingPaths(){
  this._trainingService.getAllTrainingPaths().subscribe((res) => {
    console.log(res);
    if (res) {
      this.trainingPaths = res.data;
      console.log(this.trainingPaths);
      
     this.trainingPaths.forEach((ele:any)=>{
      if(ele.id == this.id){
        console.log(ele);
        this.course=ele;
      }
     })
    }
  });
}
next(){
this.router.navigate(['/training/program',this.id])
}
}
