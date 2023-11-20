import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProjectsService } from '../../projects.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent {
  purchases!: FormGroup;
  modalID = 'purchasesModal';
  counterArray: number[] = [1];

  constructor(
    private fb: FormBuilder,
    private _ProjectsService: ProjectsService,
    private _model: ModalService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.purchases = this.fb.group({
      rows: this.fb.array([this.createRow()]),
    });
  }

  createRow(): FormGroup {
    return this.fb.group({
      field: '',
      cost: 0,
    });
  }

  addRow() {
    const rows = this.purchases.get('rows') as FormArray;
    rows.push(this.createRow());
    this.counterArray.push(this.counterArray.length + 1);
  }

  removeRow(index: number) {
    const rows = this.purchases.get('rows') as FormArray;
    rows.removeAt(index);
    this.counterArray.splice(index, 1);
}

sendFormData() {
  const formData = this.purchases.getRawValue();
  console.log(formData.rows);
  for (let i = 0; i < formData.rows.length; i++) {
    this._ProjectsService.addPurchas(formData.rows[i]).subscribe({
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
  this._Router.navigate(['/projects/marketing']);
}

  
}
