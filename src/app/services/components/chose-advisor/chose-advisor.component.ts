import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesapiService } from '../../services/servicesapi.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chose-advisor',
  templateUrl: './chose-advisor.component.html',
  styleUrls: ['./chose-advisor.component.scss']
})
export class ChoseAdvisorComponent {
  consultants!:any;
  isLoading:boolean=true;
  userInfo!:any;
  constructor(private spinner: NgxSpinnerService,private _Router: Router,private _services:ServicesapiService,private _ModalService: ModalService){
    this.userInfo=localStorage.getItem(environment.localStorageName)
   
 
  }

   ngOnInit(): void {
    this.getAllConsaltants();
    this.spinner.show();
  }

  ngAfterViewInit(): void {
    if(!this.userInfo){
      console.log("llllllll");
     this._ModalService.open('advisor');
   }
   }
   closer(){
    this._ModalService.close('advisor')
   }

  getAllConsaltants(){
    this.isLoading=false;
  this ._services.getAllconsultants().subscribe((res)=>{
      this.consultants=res
    this.isLoading=true;
console.log(this.consultants);

  })
  }

  
  redirect(id:number){
    this._Router.navigate(['/services/choose-advisor/types-of-consultations',id])
  }
}
