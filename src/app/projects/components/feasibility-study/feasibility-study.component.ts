import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../projects.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-feasibility-study',
  templateUrl: './feasibility-study.component.html',
  styleUrls: ['./feasibility-study.component.scss']
})
export class FeasibilityStudyComponent {
  commonErrorMessage: string = '';
  scheduleForm!:FormGroup;
  scheduleID='schedule'
  title = 'html-to-pdf-angular-application';
  project_id!: string | null;
  
  constructor(private fb: FormBuilder ,private _model:ModalService, private _projects:ProjectsService , private _router:Router, private route: ActivatedRoute){
    this.generateForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.project_id = params.get('project_id'); 
      console.log(this.project_id);
    });
  }

  generateForm(){
    this.scheduleForm=this.fb.group({
      main_partnerships:[null, Validators.required],
      main_activities:[null, Validators.required],
      added_value:[null, Validators.required],
      customer_relations:[null, Validators.required],
      customer_category:[null, Validators.required],
      main_sub_activities:[null, Validators.required],
      marketing_channels:[null, Validators.required],
      project_revenue:[null, Validators.required],
      project_costs:[null, Validators.required],
  })
  }

  get scheduleControls(): any {
    return this.scheduleForm.controls;
  }

  submit(){
    if (this.scheduleForm.invalid) {
      this.displayValidationMessages();
      return;
    }
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
  this.commonErrorMessage = '';
  }

  private displayValidationMessages() {
    let commonErrorMessages: string = "";
  
    Object.keys(this.scheduleForm.controls).forEach((controlName) => {
      const control = this.scheduleForm.get(controlName);
  
      if (control?.invalid) {
        const errors = control?.errors;
  
        if (errors?.['required']) {
          commonErrorMessages="يرجى التأكد من تعبئة كل الحقول";
        }
      }
    });
  
    this.commonErrorMessage = commonErrorMessages;
  }
  

  next(){
    this._model.close(this.scheduleID)
    this._router.navigate(['/projects/feasibility-study-form/'+ this.project_id])
  }
  
  
  convetToPDF()
  {
  var data:any = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
  
  const contentDataURL = canvas.toDataURL('pdf')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
 // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('new-file.pdf'); // Generated PDF
  });

  }

}
