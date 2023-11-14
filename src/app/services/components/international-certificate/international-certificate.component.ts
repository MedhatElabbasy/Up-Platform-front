import { Component } from '@angular/core';
import { ServicesapiService } from '../../services/servicesapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-international-certificate',
  templateUrl: './international-certificate.component.html',
  styleUrls: ['./international-certificate.component.scss']
})
export class InternationalCertificateComponent {

  exams!:any;
  isLoading:boolean=true
  id!:any;
  userInfo!:any;
  display:boolean=false;
constructor(private _service:ServicesapiService ,private route: ActivatedRoute,private _ModalService: ModalService,  private spinner: NgxSpinnerService,private _router:Router ){
  this.userInfo=localStorage.getItem(environment.localStorageName)
 
}

ngAfterViewInit(): void {
  if(!this.userInfo){
    console.log("llllllll");
   this._ModalService.open('local');
 }
 }
 closer(){
  this._ModalService.close('local')
 }


ngOnInit(): void {
  this.fetchExams();
  this.spinner.show();
}


fetchExams(){
  this.isLoading=true;
  this._service.getAllQuizes().subscribe((response:any)=>{
    if(response){
      this.exams = response.data
     this.exams= this.exams.filter((ele:any) => {
        return ele.exam_type=="international"
      });
      console.log(this.exams)
      this.isLoading=false;
    } 
  })
}

details(id:number){
this._router.navigate(['/services/local-certificate/certificate-details',id])
}


}
