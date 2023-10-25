import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {

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
          this.trainingPaths=res.data[0];
          console.log(this.trainingPaths)
          }
        })
      }
}
