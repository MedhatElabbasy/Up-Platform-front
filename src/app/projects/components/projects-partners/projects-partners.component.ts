import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects/projects.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-projects-partners',
  templateUrl: './projects-partners.component.html',
  styleUrls: ['./projects-partners.component.scss'],
})
export class ProjectsPartnersComponent {
  parteners!: any;
  isLoading: boolean = true;
  user_id: string = "";
  // part_id: string = "";

  constructor(
    private spinner: NgxSpinnerService,
    private ProjectsService: ProjectsService,
    private _model:ModalService,
  ) {
    this.getAllParteners();
  }

  getAllParteners() {
    this.parteners = [];
    this.isLoading = true;
    this.ProjectsService.getAllParteners().subscribe((res) => {
      this.parteners = res;
      console.log(this.parteners);
      this.isLoading = false;
    });
  }

  applyAppForPart(part_id: string){
    const formData = new FormData();
    const userDetailsString = localStorage.getItem('userDetails');
    const userId = userDetailsString ? JSON.parse(userDetailsString)?.id : null;
    formData.append('user_id', userId);
    formData.append('part_id', part_id);
    this.ProjectsService.applyAppForPart(formData).subscribe((res: any) => {
      console.log(res);
      if(res.status == 200) {
        console.log(res.msg);
        this._model.open("events")
      }
      else{
        console.log(res.msg);
      }
    });
  }

  cancel(){
    this._model.close("events")
  }

}
