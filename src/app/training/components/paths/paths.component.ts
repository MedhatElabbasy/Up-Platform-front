import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent {
  isLoading: boolean = true
  trainingPaths:any = [];
  constructor(private _trainingService:TrainingService , private _router:Router){

  }

  ngOnInit(): void {
this.getAllTrainingPaths()
  }

  getAllTrainingPaths(){
    this.isLoading = true
    this._trainingService.getAllTrainingPaths().subscribe((res)=>{
      console.log(res);
      if(res){
      this.trainingPaths=res.data;
      this._trainingService.bundleSubscription.next(this.trainingPaths);
      this.isLoading=false;
      }
    })
  }

  details(id:number){
    console.log(id);
    
   this._router.navigate(['/training/selected-path',id])
  }
  
}
