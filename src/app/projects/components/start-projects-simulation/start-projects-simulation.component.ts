import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-start-projects-simulation',
  templateUrl: './start-projects-simulation.component.html',
  styleUrls: ['./start-projects-simulation.component.scss']
})
export class StartProjectsSimulationComponent {
categories!:any
isLoading:boolean=true
constructor(private _projects:ProjectsService , private _router:Router ,   private spinner: NgxSpinnerService){
this.getAllCategories();
}


ngOnInit(): void {
  this.spinner.show();
}

getAllCategories(){
  this.isLoading=false
  this._projects.getAllCategoriesForProjects().subscribe((res:any)=>{
    this.categories=res.data;
    this.isLoading=true
    console.log(this.categories);
  })
}

getCategoryDetails(id:number){
this._router.navigate(['/projects/choose-project',id])
}
}
