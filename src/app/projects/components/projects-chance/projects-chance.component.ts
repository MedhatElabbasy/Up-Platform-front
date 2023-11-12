import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects/projects.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-projects-chance',
  templateUrl: './projects-chance.component.html',
  styleUrls: ['./projects-chance.component.scss']
})
export class ProjectsChanceComponent {
  projects!: any;
  isLoading: boolean = true;
  categories!: any;
  allCategories = ['الكل'];

  constructor(
    private spinner: NgxSpinnerService,
    private ProjectsService: ProjectsService,
  ) {
    this.getAllOpps();
  }

  ngOnInit(): void {
    this.getAllOppsCategories();
  }

  getAllOpps() {
    this.projects = [];
    this.isLoading = true;
    this.ProjectsService.getAllOpps().subscribe((res) => {
      this.projects = res;
      console.log(this.projects);
      this.isLoading = false;
    });
  }

  getAllOppsCategories() {
    this.ProjectsService.getAllOppsCategories().subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
      this.categories.forEach((ele: any) => {
        console.log(ele.opp_cat_name);
        this.allCategories.push(ele.opp_cat_name);
      });
    });
  }
}