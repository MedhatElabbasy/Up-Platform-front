import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent {

  id!:number;
  instructor!:any;
constructor(private route: ActivatedRoute , private _trainingService:TrainingService){
   this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
   this.id=params['id']
    console.log(params['id']) //log the value of id
  });
  this.getUserInfo();
}

getUserInfo(){
  this._trainingService.getUserData(this.id).subscribe((res:any)=>{
    this.instructor=res.data;
    console.log( this.instructor);
  })
}
}
