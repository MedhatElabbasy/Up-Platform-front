import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesapiService } from '../../services/servicesapi.service';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent {
  id!:any;
  exams!:any;
  exam!:any;
  constructor(private route: ActivatedRoute , private _service:ServicesapiService){
  this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
   this.id=params['id']
    console.log(params['id']) //log the value of id
  });
  this.fetchExams();
}

fetchExams(): void {
 
  this._service.getAllQuizes().subscribe((response:any)=>{
      this.exams = response.data
      console.log(response)
      this.exams.forEach((ele:any)=>{
        if(ele.id == this.id){
          console.log(ele);
          this.exam=ele;
        }
       })
    
  })
}

}
