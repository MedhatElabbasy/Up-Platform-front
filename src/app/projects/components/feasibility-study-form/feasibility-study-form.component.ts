import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../projects.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feasibility-study-form',
  templateUrl: './feasibility-study-form.component.html',
  styleUrls: ['./feasibility-study-form.component.scss'],
})
export class FeasibilityStudyFormComponent {
  feasibility!: FormGroup;
  submitted = false;
  project_id!: string | null;
  test: any[] = [50, 100];
  capitalTrue = false;
  addOnsTrue = false;
  modalID="feasibility"
  VALIDATION_MESSAGES = {
    capital_cost: {
      required: ' راس المال مطلوب',
    },
    loan_interest_percentage: {
      required: 'هذا الحقل مطلوب',
    },
    salary_per_year: {
      required: 'هذا الحقل مطلوب',
    },
    rent_per_year: {
      required: 'هذا الحقل مطلوب',
    },
    purchases_cost_per_year: {
      required: 'هذا الحقل مطلوب',
    },
    decor_cost_per_month: {
      required: 'هذا الحقل مطلوب',
    },
    marketing_cost: {
      required: 'قيمة التسويق مطلوبة',
    },
    additional_costs: {
      required: ' النثريات مطلوبه',
    },
    government_fees_0_name: {
      required: 'الترخيص مطلوب',
    },
    government_fees_0_value: {
      required: 'قيمة الترخيص مطلوبه',
    },
    added: {
      required: 'النثريات اكبر من 10 % من راس المال',
    },
    capitalRange: {
      required: 'راس المال غير متوافق',
    },
  };
  

  constructor(private fb: FormBuilder ,private _ProjectsService:ProjectsService , private _model:ModalService , private _Router:Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.validateForm();
    this.route.paramMap.subscribe(params => {
      this.project_id = params.get('project_id'); 
      console.log(this.project_id);
    });
  }

  validateForm() {
    this.feasibility = this.fb.group({
      capital_cost: ['', Validators.required],
      loan_interest_percentage: ['', Validators.required],
      salary_per_year: ['', Validators.required],
      rent_per_year: ['', Validators.required],
      purchases_cost_per_year: ['', Validators.required],
      decor_cost_per_month: ['', Validators.required],
      marketing_cost: ['', Validators.required],
      additional_costs: ['', Validators.required],
      government_fees_0_name:['', Validators.required],
      government_fees_0_value:['', Validators.required],
      government_fees_1_name:'',
      government_fees_1_value:'',
      government_fees_2_name:'',
      government_fees_2_value:'',
      added: ['', Validators.required],
      capitalRange: ['', Validators.required],
    });
    
  }

  // handle (Yes , NO ) buttons
  // ========1- handle buttons of monthly Interest=======
  handleYesRate() {
    this.feasibility.get('loan_interest_percentage')?.enable();
    this.feasibility
      .get('loan_interest_percentage')
      ?.setValidators([Validators.required]);
    this.feasibility.get('loan_interest_percentage')?.updateValueAndValidity();
  }
  handleNoRate() {
    this.feasibility.get('loan_interest_percentage')?.disable();
    this.feasibility.get('loan_interest_percentage')?.clearValidators();
    this.feasibility.get('loan_interest_percentage')?.updateValueAndValidity();
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
    const capitalValue = parseInt(this.feasibility.controls['capital_cost'].value);
    console.log(capitalValue);
    if (capitalValue >= this.test[0] && capitalValue <= this.test[1]) {
      this.capitalTrue = false;
    } else {
      this.capitalTrue = true;
    }
  }
  handleAddOns() {
    const capitalValue = parseInt(
      this.feasibility.controls['capital_cost'].value,
      10
    );
    const addOnsValue = parseInt(this.feasibility.controls['additional_costs'].value, 10);
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
    this.handleValidation();
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
          name: this.feasibility.get('government_fees_0_name')?.value,
          value: this.feasibility.get('government_fees_0_value')?.value,
        },
        {
          name: this.feasibility.get('government_fees_1_name')?.value,
          value: this.feasibility.get('government_fees_1_value')?.value,
        },
        {
          name: this.feasibility.get('government_fees_2_name')?.value,
          value: this.feasibility.get('government_fees_2_value')?.value,
        },
      ],
    };

    console.log();

    if(!(this.addOnsTrue && this.feasibility.controls['added'].hasError('required')) && !(this.capitalTrue && this.feasibility.controls['capitalRange'].hasError('required'))){
      this._ProjectsService.sendFeasibilityStudyForm(data, this.project_id).subscribe({
        next: (res: any) => {
          console.log(res);
          this._model.open(this.modalID);
        },
        error: (err: any) => {
          console.log(err.message);
        },
      });
    }
  }

  next() {
    this._model.close(this.modalID);
    this._Router.navigate(['/projects/feasibility-study-final/'+this.project_id]);
  }
}
