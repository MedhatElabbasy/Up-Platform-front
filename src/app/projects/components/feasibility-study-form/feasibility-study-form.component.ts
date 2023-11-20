import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../projects.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feasibility-study-form',
  templateUrl: './feasibility-study-form.component.html',
  styleUrls: ['./feasibility-study-form.component.scss'],
})
export class FeasibilityStudyFormComponent {
  feasibility!: FormGroup;
  submitted = false;
  test: any[] = [50, 100];
  capitalTrue = false;
  addOnsTrue = false;
  modalID="feasibility"
  VALIDATION_MESSAGES = {
    projectName: {
      required: 'اسم المشروع',
    },
    capital: {
      required: ' راس المال مطلوب',
    },
    rentValue: {
      required: ' قمية الابجار مطلوبه',
    },
    yearSalary: {
      required: 'قيمة الرواتب مطلوبه',
    },

    monthlyInterest: {
      required: 'الفايده الشهريه مطلوبه',
    },
    decorationCost: {
      required: ' تكلفة الديكور مطلوبه',
    },
    license: {
      required: '   الترخيص مطلوب',
    },
    valueLicense: {
      required: 'قيمة الترخيص مطلوبه',
    },
    valuesGoods: {
      required: 'تكلفة البضاعه مطلوبه',
    },
    marketingValue: {
      required: 'قيمة التسويق مطلوبه',
    },
    addOns: {
      required: ' النثريات مطلوبه',
    },
    tools: {
      required: 'تكلفة المعدات مطلوبه',
    },
    capitalRange: {
      required: 'راس المال غير متوافق',
    },
    added: {
      required: 'النثريات اكبر من 10 % من راس المال',
    },
  };

  constructor(private fb: FormBuilder ,private _ProjectsService:ProjectsService , private _model:ModalService , private _Router:Router) {}

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm() {
    this.feasibility = this.fb.group({
      projectName: ['', Validators.required],
      capital_cost: ['', Validators.required],
      rent_per_year: ['', Validators.required],
      salary_per_year: ['', Validators.required],
      monthlyInterest: ['', Validators.required],
      decor_cost_per_month: ['', Validators.required],
      license: ['', Validators.required],
      valueLicense: ['', Validators.required],
      valuesGoods: ['', Validators.required],
      marketingValue: ['', Validators.required],
      addOns: ['', Validators.required],
      tools: ['', Validators.required],
      capitalRange: ['', Validators.required],
      added: ['', Validators.required],
    });
  }

  // handle (Yes , NO ) buttons
  // ========1- handle buttons of monthly Interest=======
  handleYesRate() {
    this.feasibility.get('monthlyInterest')?.enable();
    this.feasibility
      .get('monthlyInterest')
      ?.setValidators([Validators.required]);
    this.feasibility.get('monthlyInterest')?.updateValueAndValidity();
  }
  handleNoRate() {
    this.feasibility.get('monthlyInterest')?.disable();
    this.feasibility.get('monthlyInterest')?.clearValidators();
    this.feasibility.get('monthlyInterest')?.updateValueAndValidity();
  }

  // ========2- handle buttons of monthly Interest=======
  handleYesTools() {
    this.feasibility.get('tools')?.enable();
    this.feasibility.get('tools')?.setValidators([Validators.required]);
    this.feasibility.get('tools')?.updateValueAndValidity();
  }
  handleNoTools() {
    this.feasibility.get('tools')?.disable();
    this.feasibility.get('tools')?.clearValidators();
    this.feasibility.get('tools')?.updateValueAndValidity();
  }

  handleCapitalRange() {
    const capitalValue = parseInt(this.feasibility.controls['capital'].value);
    console.log(capitalValue);
    if (capitalValue >= this.test[0] && capitalValue <= this.test[1]) {
      this.capitalTrue = false;
    } else {
      this.capitalTrue = true;
    }
  }
  handleAddOns() {
    const capitalValue = parseInt(
      this.feasibility.controls['capital'].value,
      10
    );
    const addOnsValue = parseInt(this.feasibility.controls['addOns'].value, 10);
    console.log(addOnsValue);
    console.log(0.1 * capitalValue);

    if (addOnsValue > 0.1 * capitalValue) {
      this.addOnsTrue = true;
    } else {
      this.addOnsTrue = false;
    }
  }

  handleValidation() {
    this.submitted = true;
    this.handleCapitalRange();
    this.handleAddOns();

  }

  sendFormData() {
    const data = {
      capital_cost: this.feasibility.get('capital_cost')?.value,
      loan_interest_percentage: this.feasibility.get(
        'loan_interest_percentage'
      )?.value,
      salary_per_year: this.feasibility.get('salary_per_year')?.value,
      rent_per_year: this.feasibility.get('rent_per_year')?.value,
      purchases_cost_per_year: this.feasibility.get(
        'purchases_cost_per_year'
      )?.value,
      decor_cost_per_month: this.feasibility.get(
        'decor_cost_per_month'
      )?.value,
      marketing_cost: this.feasibility.get('marketing_cost')?.value,
      additional_costs:
        this.feasibility.get('additional_costs')?.value,
      government_fees: [
        {
          name: this.feasibility.get('government_fees1_name')?.value,
          value: this.feasibility.get('government_fees1_value')?.value,
        },
        {
          name: this.feasibility.get('government_fees2_name')?.value,
          value: this.feasibility.get('government_fees2_value')?.value,
        },
        {
          name: this.feasibility.get('government_fees3_name')?.value,
          value: this.feasibility.get('government_fees3_value')?.value,
        },
      ],
    };

    this._ProjectsService.sendFeasibilityStudyForm(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this._model.open(this.modalID);
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }

  next() {
    this._model.close(this.modalID);
    this._Router.navigate(['/projects/feasibility-study']);
  }
}
