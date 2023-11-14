import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects/projects.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.scss'],
})
export class NewProjectFormComponent {
  newProjectForm: FormGroup;
  errorMessage: string = '';
  part_title: string = '';
  part_desc: string = '';
  part_duration: string = '';
  part_percentage: string = '';
  part_location: string = '';
  part_rules: string = '';
  part_cost: string = '';
  user_id: any;
  partcat_id: number = 0;
  modalID = 'newProject';
  validationMessages = {
    part_title: {
      required: 'عنوان المشروع مطلوب',
    },
    part_desc: {
      required: 'وصف المشروع مطلوب',
    },
    part_duration: {
      required: 'مدة المشروع مطلوبة',
    },
    part_percentage: {
      required: 'النسبة مطلوبة',
    },
    part_location: {
      required: ' مكان المشروع مطلوب',
    },
    part_rules: {
      required: ' قواعد المشروع مطلوبة',
    },
    part_cost: {
      required: ' تكلفة المشروع مطلوبة',
    },
    
  };
  isFormSubmitted = false;

  constructor(
    public _ProjectService: ProjectsService,
    private _modal: ModalService,
    private _Router: Router,
    private fb: FormBuilder
  ) {
    this.newProjectForm = this.fb.group({
      part_title: ['', Validators.required],
      part_desc: ['', Validators.required],
      part_duration: ['', Validators.required],
      part_percentage: ['', Validators.required],
      part_location: ['', Validators.required],
      part_rules: ['', Validators.required],
      part_cost: ['', Validators.required],
    });
  }

  newPartener() {
    this.isFormSubmitted = true;
    const userDetailsString = localStorage.getItem('userDetails');
    const userId = userDetailsString ? JSON.parse(userDetailsString)?.id : null;
    const formData = new FormData();
    formData.append('part_title', this.newProjectForm.value.part_title);
    formData.append('part_desc', this.newProjectForm.value.part_desc);
    formData.append('part_duration', this.newProjectForm.value.part_duration);
    formData.append(
      'part_percentage',
      this.newProjectForm.value.part_percentage
    );
    formData.append('part_location', this.newProjectForm.value.part_location);
    formData.append('part_rules', this.newProjectForm.value.part_rules);
    formData.append('part_cost', this.newProjectForm.value.part_cost);
    formData.append('user_id', userId);
    formData.append('partcat_id', '2');

    if (this.newProjectForm.valid) {
      console.log('success, validation');
      this._ProjectService.newPartener(formData).subscribe((res: any) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res.message);
          this._modal.open(this.modalID);
        }
      });
    } else {
      Object.keys(this.newProjectForm.controls).forEach((controlName) => {
        this.newProjectForm.get(controlName)?.markAsTouched();
      });
    }
  }
  cancel() {
    this._modal.close(this.modalID);
    this._Router.navigate(['/projects/projects-partners']);
  }
}
