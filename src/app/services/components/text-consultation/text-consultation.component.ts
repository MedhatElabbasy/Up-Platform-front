import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesapiService } from '../../services/servicesapi.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-text-consultation',
  templateUrl: './text-consultation.component.html',
  styleUrls: ['./text-consultation.component.scss']
})
export class TextConsultationComponent {
  MessageForm!:FormGroup
  id!:any
  textID='text';
  consultants!:any;
  consultant!:any;
  constructor( private fb: FormBuilder, private router: Router ,private route: ActivatedRoute,private _services:ServicesapiService , private _modal:ModalService){
    this.id=this.route.parent?.snapshot.url[1].path
    console.log(this.id);
    this.generateCommentForm();
    this.getAllConsaltants();
    
  }

  generateCommentForm() {
    this.MessageForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }
  
  get reasoncontrols(): any {
    return this.MessageForm.controls;
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

  sendMessage(){
  let message=this.MessageForm.controls['message'].value
  let d= this.id
  console.log(message,d);

  let formBlog = new FormData();
  formBlog.append("message",message);
  formBlog.append("receiver_id",d);
  console.log("FormData",formBlog.get("message"));
  console.log("FormData",formBlog.get("receiver_id"));
   this._services.addTextConsultation(formBlog).subscribe((res)=>{
    console.log(res);
    this._modal.open(this.textID)
   })
  }

  close(){
    this._modal.close(this.textID)
    this.router.navigate(['/services/choose-advisor'])
  }

  redirect(){
    this.router.navigate(['/services/Consultant-biography',this.consultant.id])
  }
}
