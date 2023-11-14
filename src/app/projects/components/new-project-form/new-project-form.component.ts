import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects/projects.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.scss']
})
export class NewProjectFormComponent {
  part_title: string = '';
  part_desc: string = '';
  part_duration: string = '';
  part_percentage: string = '';
  part_location: string = '';
  part_rules: string = '';
  part_cost: string = '';
  user_id: string = '';
  partcat_id: string = '';

  constructor(public _ProjectService: ProjectsService, private toastr: ToastrService, private _Router: Router) {}

  newPartener() {
    const formData = new FormData();
    formData.append('part_title', this.part_title);
    formData.append('part_desc', this.part_desc);
    formData.append('part_duration', this.part_duration);
    formData.append('part_percentage', this.part_percentage);
    formData.append('part_location', this.part_location);
    formData.append('part_rules', this.part_rules);
    formData.append('part_cost', this.part_cost);
    const userDetailsString = localStorage.getItem('userDetails');
    const userId = userDetailsString ? JSON.parse(userDetailsString)?.id : null;
    this.user_id = userId;
    formData.append('user_id', this.user_id);
    formData.append('partcat_id', "2");

    this._ProjectService.newPartener(formData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        console.log(res.message);
        this.showSuccessToast(res.msg);
        setTimeout(() => {
          this._Router.navigate(['/projects/projects-partners'])
        }, 2000);
      } else {
        console.log(res.message);
        this.showErrorToast(res.msg);
      }
    });
  }

  showSuccessToast(message: string) {
    this.toastr.success('تمت الإضافة بنجاح');
  }

  showErrorToast(message: string) {
    this.toastr.error('فشل الإضافة');
  }
}
