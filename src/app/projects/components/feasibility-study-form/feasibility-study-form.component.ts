import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectsService } from '../../projects.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feasibility-study-form',
  templateUrl: './feasibility-study-form.component.html',
  styleUrls: ['./feasibility-study-form.component.scss'],
})
export class FeasibilityStudyFormComponent {
  modalID = 'modalID';
  FeasibilityStudyForm!: FormGroup;

  constructor(
    private _ProjectsService: ProjectsService,
    private formBuilder: FormBuilder,
    private _Router: Router,
    private _model: ModalService
  ) {}

  ngOnInit() {
    this.FeasibilityStudyForm = this.formBuilder.group({
      capital_cost: [''],
      loan_interest_percentage: [''],
      salary_per_year: [''],
      rent_per_year: [''],
      purchases_cost_per_year: [''],
      decor_cost_per_month: [''],
      marketing_cost: [''],
      additional_costs: [''],
      government_fees1_name: [''],
      government_fees1_value: [''],
      government_fees2_name: [''],
      government_fees2_value: [''],
      government_fees3_name: [''],
      government_fees3_value: [''],
    });
  }

  sendFormData() {
    const data = {
      capital_cost: this.FeasibilityStudyForm.get('capital_cost')?.value,
      loan_interest_percentage: this.FeasibilityStudyForm.get(
        'loan_interest_percentage'
      )?.value,
      salary_per_year: this.FeasibilityStudyForm.get('salary_per_year')?.value,
      rent_per_year: this.FeasibilityStudyForm.get('rent_per_year')?.value,
      purchases_cost_per_year: this.FeasibilityStudyForm.get(
        'purchases_cost_per_year'
      )?.value,
      decor_cost_per_month: this.FeasibilityStudyForm.get(
        'decor_cost_per_month'
      )?.value,
      marketing_cost: this.FeasibilityStudyForm.get('marketing_cost')?.value,
      additional_costs:
        this.FeasibilityStudyForm.get('additional_costs')?.value,
      government_fees: [
        {
          name: this.FeasibilityStudyForm.get('government_fees1_name')?.value,
          value: this.FeasibilityStudyForm.get('government_fees1_value')?.value,
        },
        {
          name: this.FeasibilityStudyForm.get('government_fees2_name')?.value,
          value: this.FeasibilityStudyForm.get('government_fees2_value')?.value,
        },
        {
          name: this.FeasibilityStudyForm.get('government_fees3_name')?.value,
          value: this.FeasibilityStudyForm.get('government_fees3_value')?.value,
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
