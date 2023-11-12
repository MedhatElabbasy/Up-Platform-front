import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from 'src/app/training/Services/training.service';
import { ServicesapiService } from '../../services/servicesapi.service';

@Component({
  selector: 'app-consultantbiography',
  templateUrl: './consultantbiography.component.html',
  styleUrls: ['./consultantbiography.component.scss']
})
export class ConsultantbiographyComponent {
  id!:any;
  consultants!:any;
  consultant!:any
constructor(private route: ActivatedRoute , private _trainingService:TrainingService , private _services:ServicesapiService){
  this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
   this.id=params['id']
    console.log(params['id']) //log the value of id
  });
this.getAllConsaltants();
}


getAllConsaltants(){
  this ._services.getAllconsultants().subscribe((res)=>{
    if(res){
this.consultants=res
console.log(this.consultants);
this.consultants.forEach((ele:any) => {
  if(ele.id == this.id){
this.consultant=ele
  }
});
console.log(this.consultant);
    }
  })
 
  }
}
