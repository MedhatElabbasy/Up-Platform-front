import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
export interface Range {
  value: number;
  name: string;
}
@Component({
  selector: 'app-power-of-idea',
  templateUrl: './power-of-idea.component.html',
  styleUrls: ['./power-of-idea.component.scss'],
})
export class PowerOfIdeaComponent {
  ideaID="idea"
  constructor(
    private _ProjectsService: ProjectsService,
    private formBuilder: FormBuilder,
    private _Router: Router,
    private _model:ModalService
  ) {
  }

  weaknessesRanges: Range[] = [
    { value: 1, name: 'weakness1' },
    { value: 1, name: 'weakness2' },
    { value: 1, name: 'weakness3' },
    { value: 1, name: 'weakness4' },
    { value: 1, name: 'weakness5' },
  ];
  strengthsRanges: Range[] = [
    { value: 1, name: 'strength1' },
    { value: 1, name: 'strength2' },
    { value: 1, name: 'strength3' },
    { value: 1, name: 'strength4' },
    { value: 1, name: 'strength5' },
  ];
  threatsRanges: Range[] = [
    { value: 1, name: 'threat1' },
    { value: 1, name: 'threat2' },
    { value: 1, name: 'threat3' },
    { value: 1, name: 'threat4' },
    { value: 1, name: 'threat5' },
  ];
  opportunitiesRanges: Range[] = [
    { value: 1, name: 'opport1' },
    { value: 1, name: 'opport2' },
    { value: 1, name: 'opport3' },
    { value: 1, name: 'opport4' },
    { value: 1, name: 'opport5' },
  ];

  weaknessesTotal: number = this.calculateTotal(this.weaknessesRanges);
  strengthsTotal: number = this.calculateTotal(this.strengthsRanges);
  threatsTotal: number = this.calculateTotal(this.threatsRanges);
  opportunitiesTotal: number = this.calculateTotal(this.opportunitiesRanges);
  commonErrorMessage: string = '';
  pointsForm!: FormGroup;

  ngOnInit() {
    
    this.pointsForm = this.formBuilder.group({
      weakness1: [''],
      weakness1Text: ['', Validators.required],
      weakness2: [''],
      weakness2Text: ['', Validators.required],
      weakness3: [''],
      weakness3Text: ['', Validators.required],
      weakness4: [''],
      weakness4Text: ['', Validators.required],
      weakness5: [''],
      weakness5Text: ['', Validators.required],
      strength1: [''],
      strength1Text: ['', Validators.required],
      strength2: [''],
      strength2Text: ['', Validators.required],
      strength3: [''],
      strength3Text: ['', Validators.required],
      strength4: [''],
      strength4Text: ['', Validators.required],
      strength5: [''],
      strength5Text: ['', Validators.required],
      opport1: [''],
      opport1Text: ['', Validators.required],
      opport2: [''],
      opport2Text: ['', Validators.required],
      opport3: [''],
      opport3Text: ['', Validators.required],
      opport4: [''],
      opport4Text: ['', Validators.required],
      opport5: [''],
      opport5Text: ['', Validators.required],
      threat1: [''],
      threat1Text: ['', Validators.required],
      threat2: [''],
      threat2Text: ['', Validators.required],
      threat3: [''],
      threat3Text: ['', Validators.required],
      threat4: [''],
      threat4Text: ['', Validators.required],
      threat5: [''],
      threat5Text: ['', Validators.required],
    });
  }


  onRangeChange(range: Range, rangeArray: Range[]) {
    this.updateTotal(rangeArray);
  }

  calculateTotal(rangeArray: Range[]): number {
    return rangeArray.reduce((sum, range) => sum + range.value, 0);
  }

  updateTotal(rangeArray: Range[]) {
    if (rangeArray === this.weaknessesRanges) {
      this.weaknessesTotal = this.calculateTotal(this.weaknessesRanges);
    } else if (rangeArray === this.strengthsRanges) {
      this.strengthsTotal = this.calculateTotal(this.strengthsRanges);
    } else if (rangeArray === this.threatsRanges) {
      this.threatsTotal = this.calculateTotal(this.threatsRanges);
    } else if (rangeArray === this.opportunitiesRanges) {
      this.opportunitiesTotal = this.calculateTotal(this.opportunitiesRanges);
    }
  }

  sendPointsData(id: number) {
    if (this.pointsForm.invalid) {
      this.displayValidationMessages();
      return;
    }
    const data = {
      "points": {
      "strength": {
          "point_1": {
              "name":this.pointsForm.get('strength1Text')?.value,
              "value": this.pointsForm.get('strength1')?.value,
          },
          "point_2": {
            "name":this.pointsForm.get('strength2Text')?.value,
            "value": this.pointsForm.get('strength2')?.value,
          },
          "point_3": {
            "name":this.pointsForm.get('strength3Text')?.value,
            "value": this.pointsForm.get('strength3')?.value,
          },
          "point_4": {
            "name":this.pointsForm.get('strength4Text')?.value,
            "value": this.pointsForm.get('strength4')?.value,
          },
          "point_5": {
            "name":this.pointsForm.get('strength5Text')?.value,
            "value": this.pointsForm.get('strength5')?.value,
          }
      },
      "opportunities": {
          "point_1": {
            "name":this.pointsForm.get('opport1Text')?.value,
            "value": this.pointsForm.get('opport1')?.value,
          },
          "point_2": {
            "name":this.pointsForm.get('opport2Text')?.value,
            "value": this.pointsForm.get('opport2')?.value,
          },
          "point_3": {
            "name":this.pointsForm.get('opport3Text')?.value,
            "value": this.pointsForm.get('opport3')?.value,
          },
          "point_4": {
            "name":this.pointsForm.get('opport4Text')?.value,
            "value": this.pointsForm.get('opport4')?.value,
          },
          "point_5": {
            "name":this.pointsForm.get('opport5Text')?.value,
            "value": this.pointsForm.get('opport5')?.value,
          }
      },
      "weaknesses": {
          "point_1": {
            "name":this.pointsForm.get('weakness1Text')?.value,
            "value": this.pointsForm.get('weakness1')?.value,
          },
          "point_2": {
            "name":this.pointsForm.get('weakness2Text')?.value,
            "value": this.pointsForm.get('weakness2')?.value,
          },
          "point_3": {
            "name":this.pointsForm.get('weakness3Text')?.value,
            "value": this.pointsForm.get('weakness3')?.value,
          },
          "point_4": {
            "name":this.pointsForm.get('weakness4Text')?.value,
            "value": this.pointsForm.get('weakness4')?.value,
          },
          "point_5": {
            "name":this.pointsForm.get('weakness5Text')?.value,
            "value": this.pointsForm.get('weakness5')?.value,
          }
      },
      "threats": {
          "point_1": {
            "name":this.pointsForm.get('threat1Text')?.value,
            "value": this.pointsForm.get('threat1')?.value,
          },
          "point_2": {
            "name":this.pointsForm.get('threat2Text')?.value,
            "value": this.pointsForm.get('threat2')?.value,
          },
          "point_3": {
            "name":this.pointsForm.get('threat3Text')?.value,
            "value": this.pointsForm.get('threat3')?.value,
          },
          "point_4": {
            "name":this.pointsForm.get('threat4Text')?.value,
            "value": this.pointsForm.get('threat4')?.value,
          },
          "point_5": {
            "name":this.pointsForm.get('threat5Text')?.value,
            "value": this.pointsForm.get('threat5')?.value,
          }
      } 
    }
  }
    
    this._ProjectsService.sendPointsData(data).subscribe({
      next: (res: any) => {
        console.log(res);
        const finalTotal = (this.opportunitiesTotal+this.strengthsTotal)- (this.threatsTotal+this.weaknessesTotal);
        this._model.open(this.ideaID)
        console.log(finalTotal);
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
    this.commonErrorMessage = '';
  }

  private displayValidationMessages() {
    let commonErrorMessages: string = "";
  
    Object.keys(this.pointsForm.controls).forEach((controlName) => {
      const control = this.pointsForm.get(controlName);
  
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
    this._model.close(this.ideaID)
    this._Router.navigate(['/projects/feasibility-study'])
  }
}
