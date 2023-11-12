import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesapiService } from '../../services/servicesapi.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-online-consultation',
  templateUrl: './online-consultation.component.html',
  styleUrls: ['./online-consultation.component.scss']
})
export class OnlineConsultationComponent {
  selected!: Date | null;
  onlineForm!:FormGroup;
  onlineID='online'
  id!:any;
  consultants!:any;
  consultant!:any;
  constructor( private router: Router,private route: ActivatedRoute,private _domSanitizer: DomSanitizer,private fb: FormBuilder,private _service:ServicesapiService,
    private _modal:ModalService){
      this.id=this.route.parent?.snapshot.url[1].path
      console.log(this.id);
      this.generateForm();
      this.getAllConsaltants();
    }
  generateForm() {
    this.onlineForm = this.fb.group({
      message: [
        '',
        [Validators.required],
      ],
      appointment_date: [
        '',
        [Validators.required],
      ],
      appointment_time:['',[Validators.required]],
     
      receiver_id: [null],
     
    });

   
  }

  //get control
  get blogsControls(): any {
    return this.onlineForm.controls;
  }

  redirect(){
    this.router.navigate(['/services/Consultant-biography',this.consultant.id])
  }

  getAllConsaltants(){
    this ._service.getAllconsultants().subscribe((res)=>{
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


  submitOnline(){
    let formBlog = new FormData();
    let formattedDate = this.onlineForm.controls['appointment_date'].value.toISOString().split('T')[0];
    formBlog.append('message', this.onlineForm.controls['message'].value);
    formBlog.append('receiver_id',this.id);
    formBlog.append('appointment_date',formattedDate);
    formBlog.append('appointment_time',this.onlineForm.controls['appointment_time'].value);

    this._service.addOnlineConsultation(formBlog).subscribe((res)=>{
      console.log(res);
     this._modal.open(this.onlineID)
      
    })
  }
  close(){
    this._modal.close(this.onlineID)
    this.router.navigate(['/services/choose-advisor'])
  }
}
