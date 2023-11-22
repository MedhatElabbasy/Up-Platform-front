import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/core/services/modal.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-choose-project',
  templateUrl: './choose-project.component.html',
  styleUrls: ['./choose-project.component.scss']
})
export class ChooseProjectComponent {
subCategory!:any;
subID!:any;
id!:any;
isLoading:boolean=true
lessons!:any
project_id:any;
modalID="chooseProject"
projectName!: FormGroup;

constructor(private _projects:ProjectsService , private route: ActivatedRoute,  private spinner: NgxSpinnerService, private _model:ModalService, private _Router: Router, private fb: FormBuilder){
  this.route.params.subscribe((params) => {
    this.id = params['id'];
  });
  this.getSubCategories();
  this.getAllLessons()
}

ngOnInit(): void {
  this.spinner.show();
  this.projectName = this.fb.group({
    projectName: '',
  });
}

getSubCategories(){
  this.isLoading=false
  this._projects.getDetailsOfCategory(this.id).subscribe((res:any)=>{
    console.log(res);
    this.isLoading=true
    this.subCategory=res.data.subcategories;
  })
}

getAllLessons(){
  let model={
    "type": "points"
  }
  this._projects.getAllLessons(model).subscribe((res:any)=>{
    if(res){
    this.lessons=res.data
    console.log(res);
    
    console.log(this.lessons);
    this._projects.getLessonDetails(this.lessons[0].id).subscribe((res)=>{
      console.log(res);
    })
    }
  })
}

openModal(subID: any){
  this._model.open(this.modalID)
  this.subID = subID;
}

next(){
  this._model.close(this.modalID);
  const data = {
    "name": this.projectName.get('projectName')?.value,
    "category_id": this.id,
    "subcategory_id": this.subID
  }
  this._projects.addProject(data).subscribe((res:any)=>{
    console.log(res);
    this.project_id = res.data.id;
    this._Router.navigate(['/projects/power-of-idea/'+this.id+'/'+this.subID+'/'+this.project_id])
  })
}
}
