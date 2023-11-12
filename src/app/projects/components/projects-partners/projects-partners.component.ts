import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects/projects.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-projects-partners',
  templateUrl: './projects-partners.component.html',
  styleUrls: ['./projects-partners.component.scss'],
})
export class ProjectsPartnersComponent {
  parteners!: any;
  isLoading: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
    private ProjectsService: ProjectsService
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
}
