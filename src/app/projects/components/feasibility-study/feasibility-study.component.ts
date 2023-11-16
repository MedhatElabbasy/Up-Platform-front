import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectsService } from '../../projects.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-feasibility-study',
  templateUrl: './feasibility-study.component.html',
  styleUrls: ['./feasibility-study.component.scss']
})
export class FeasibilityStudyComponent {
  scheduleForm!:FormGroup;
  scheduleID='schedule'
  constructor(private fb: FormBuilder ,private _model:ModalService, private _projects:ProjectsService , private _router:Router){
    this.generateForm();
  }

  generateForm(){
    this.scheduleForm=this.fb.group({
      main_partnerships:[null],
      main_activities:[null],
      added_value:[null],
      customer_relations:[null],
      customer_category:[null],
      main_sub_activities:[null],
      marketing_channels:[null],
      project_revenue:[null],
      project_costs:[null],
  })
  }

  get scheduleControls(): any {
    return this.scheduleForm.controls;
  }

  submit(){
    let model={
      "main_partnerships": this.scheduleForm.controls['main_partnerships'].value,
      "main_activities": this.scheduleForm.controls['main_activities'].value,
      "added_value": this.scheduleForm.controls['added_value'].value,
      "customer_relations": this.scheduleForm.controls['customer_relations'].value,
      "customer_category": this.scheduleForm.controls['customer_category'].value,
      "main_sub_activities": this.scheduleForm.controls['main_sub_activities'].value,
      "marketing_channels": this.scheduleForm.controls['marketing_channels'].value,
      "project_revenue": this.scheduleForm.controls['project_revenue'].value,
      "project_costs": this.scheduleForm.controls['project_costs'].value
  }
  console.log(model)
  this._projects.sendDataForProject(model).subscribe((res)=>{
    console.log(res);
   this._model.open(this.scheduleID)
  })
  }

  next(){
    this._model.close(this.scheduleID)
    this._router.navigate(['/projects/feasibility-study-form'])
  }
}
