import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingService } from '../../Services/training.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  questionForm!:FormGroup;
  questions!:any;
  points!:any;
  start!:any;
  startTestID='startTest'
  isLoading:boolean=false
  successID='success'
  constructor(  private router: Router,
    private fb: FormBuilder,
    private _training:TrainingService,
    private _model:ModalService,
    private spinner: NgxSpinnerService
    ) {
      this.questionForm = this.fb.group({});
      this.startTest();
      
  }

  ngOnInit() {
    this.spinner.show();
  }

  startTest(){
   this.isLoading=true
    this._training.startTest().subscribe((res)=>{
      console.log(res);
      this.start=res.success;
      console.log(this.start);
      this.isLoading=true
      if(this.start==false){
          this._model.open(this.startTestID)
      }else if(this.start==true){
      
        this. getAllQuestions();
      }
    })
  }

  cancel(){
    this.router.navigate(['training/main/training-paths'])
    this._model.close(this.startTestID)
  }

  done(){
    this.router.navigate(['training/paths'])
    this._model.close(this.successID)
  }
  

  initializeForm() {
    this.questions.forEach((question:any) => {
      const controlName = `question${question.id}`;
      this.questionForm.addControl(controlName, new FormControl(null));
    });
  }

  onSubmit() {
    const selectedAnswers:any = [];

    this.questions.forEach((question:any) => {
      const controlName = `question${question.id}`;
      const answerControl = this.questionForm.get(controlName);
  
      if (answerControl?.value) {
        selectedAnswers.push({
          "question_id": question.id,
          "answer_id": answerControl.value,
        });
      }
    });

    let model ={ "answers": selectedAnswers }
    // Now, 'selectedAnswers' array contains the question ID and selected answer ID for each question
    console.log('Selected Answers:', selectedAnswers);
    console.log(model);
    

    this._training.submitResults(model).subscribe((res)=>{
      if(res){
      console.log(res);
      this._training.getResultOfTest().subscribe((response)=>{
        console.log(response);
        this.points=response.points;
        if(this.points >=0 && this.points<=19){
           this._model.open(this.successID)
           const page=document.getElementById("successTitle");
           if (page !== null) {
            page.innerHTML = "أنت مؤهل لمسار تأهيل";
          }

        }
        else if(this.points >=20 && this.points<=50){
          this._model.open(this.successID)
          const page=document.getElementById("successTitle");
          if (page !== null) {
           page.innerHTML = "أنت مؤهل لمسار تمكين";
        }
      }
      })
      }
    })
  }

 

  

  getAllQuestions(){
    this._training.getQuestions().subscribe((res)=>{
      if(res){
        this.isLoading=false
this.questions=res.data;
console.log(this.questions);
this.initializeForm();
      }
    })
  }

  // onSubmit(){

  // }
}
