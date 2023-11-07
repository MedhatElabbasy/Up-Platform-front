import { Component } from '@angular/core';
import { ServicesapiService } from '../../services/servicesapi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-local-certificate',
  templateUrl: './local-certificate.component.html',
  styleUrls: ['./local-certificate.component.scss']
})
export class LocalCertificateComponent {

  exams!:any;
  isLoading:boolean=true
constructor(private _service:ServicesapiService ,  private spinner: NgxSpinnerService,private _router:Router ){

}



ngOnInit(): void {
  this.fetchExams();
  this.spinner.show();
}


fetchExams(): void {
  this.isLoading=true;
  this._service.getAllQuizes().subscribe((response:any)=>{
      this.exams = response.data
      console.log(response)
      this.isLoading=false;
    
  })
}

details(id:number){
this._router.navigate(['/services/local-certificate/certificate-details',id])
}



}

