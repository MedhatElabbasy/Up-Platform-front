import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-choose-project',
  templateUrl: './choose-project.component.html',
  styleUrls: ['./choose-project.component.scss']
})
export class ChooseProjectComponent {
subCategory!:any;
id!:any;
isLoading:boolean=true
lessons!:any
constructor(private _projects:ProjectsService , private route: ActivatedRoute,  private spinner: NgxSpinnerService){
  this.route.params.subscribe((params) => {
    this.id = params['id'];
  });
  this.getSubCategories();
  this.getAllLessons()
}

ngOnInit(): void {
  this.spinner.show();
}

getSubCategories(){
  this.isLoading=false
  this._projects.getDetailsOfCategory(this.id).subscribe((res:any)=>{
    console.log(res);
    this.isLoading=true
    this.subCategory=res.data.subcategories;
    console.log(this.subCategory);
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
}
