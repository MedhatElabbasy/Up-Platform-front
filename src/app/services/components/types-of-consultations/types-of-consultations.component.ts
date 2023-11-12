import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesapiService } from '../../services/servicesapi.service';

@Component({
  selector: 'app-types-of-consultations',
  templateUrl: './types-of-consultations.component.html',
  styleUrls: ['./types-of-consultations.component.scss']
})
export class TypesOfConsultationsComponent {
  id!:any
  consultants!:any
  consultant!:any;
constructor( private router: Router ,private route: ActivatedRoute,private _services:ServicesapiService ){
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

  redirect(){
    this.router.navigate(['/services/Consultant-biography',this.consultant.id])
  }
  textcons(){
    console.log(this.id);
    
      this.router.navigate([`/services/choose-advisor/types-of-consultations/${this.id}/text-consultation`])
  }

  onlinecons(){
    console.log(this.id);
    this.router.navigate([`/services/choose-advisor/types-of-consultations/${this.id}/online-consultation`])
  }

}
