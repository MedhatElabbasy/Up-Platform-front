import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent {
  isLoading: boolean = true
  trainingPaths:any = [];
  constructor(private _trainingService:TrainingService){

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

  addToCart(id:number, type: string) {
    const cartBtn = document.getElementById("cartBtn") as HTMLButtonElement;
    this._trainingService.addToCart(id, type).subscribe((res: any) => {
        console.log(res);
        const cartBtn = document.getElementById("cartBtn") as HTMLButtonElement;
        if(res.success) {
          cartBtn.innerText = 'تمت الإضافة للسلة';
          cartBtn.disabled = true;
        }
        else{
          cartBtn.innerText = 'مضاف بالفعل للسلة'; 
          cartBtn.disabled = true;
        }
    })
  }

}
