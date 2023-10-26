import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent {

  trainingPaths!:any;
  constructor(private _trainingService:TrainingService){

  }

  ngOnInit(): void {
this.getAllTrainingPaths()
  }

  getAllTrainingPaths(){
    this._trainingService.getAllTrainingPaths().subscribe((res)=>{
      console.log(res);
      if(res){
      this.trainingPaths=res.data;
      }
    })
  }

}
