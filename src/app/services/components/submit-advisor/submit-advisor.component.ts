import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesapiService } from '../../services/servicesapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-advisor',
  templateUrl: './submit-advisor.component.html',
  styleUrls: ['./submit-advisor.component.scss']
})
export class SubmitAdvisorComponent {
id!:any
blogs!:any;
blog!:any;
comments!:any;
addCommentForm!:FormGroup;
constructor(private route:ActivatedRoute , private _services:ServicesapiService ,   private fb: FormBuilder){
  this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
   this.id=params['id']
    console.log(params['id']) //log the value of id
  });
  this.getAllBlogs();
  this.getAllComments();
  this.generateCommentForm();
}


getAllBlogs(){
  //this.isLoading=true
  this._services.getAllBlogs().subscribe((res)=>{
    console.log(res);
    console.log(res.data);
   //this.isLoading=false;
    this.blogs=res.data;
    this.blogs.forEach((ele:any)=>{
      if(ele.id == this.id){
        console.log(ele);
        this.blog=ele;
      }
     })
     console.log(this.blog);
  })
}

getAllComments(){
  this._services.getAllComments(this.id).subscribe((res:any)=>{
    console.log(res);
    this.comments=res.data;
  })
}

generateCommentForm() {
  this.addCommentForm = this.fb.group({
    comment: ['', [Validators.required]],
  });
}

get reasoncontrols(): any {
  return this.addCommentForm.controls;
}


addComment(){
  let fd = new FormData();
fd.append("comment", this.addCommentForm.controls['comment'].value);

this._services.addNewComment(this.id,fd).subscribe((res)=>{
console.log(res);
this.addCommentForm.reset();
})
}
}
