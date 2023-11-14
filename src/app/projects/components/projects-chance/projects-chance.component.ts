import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects/projects.service';

@Component({
  selector: 'app-projects-chance',
  templateUrl: './projects-chance.component.html',
  styleUrls: ['./projects-chance.component.scss']
})
export class ProjectsChanceComponent {
  projects!: any;
  categories!: any;
  allCategories = ['الكل'];

  constructor(
    private ProjectsService: ProjectsService,
  ) {
    this.getAllOpps();
  }

  ngOnInit(): void {
    this.getAllOppsCategories();
  }

  getAllOpps() {
    this.projects = [];
    this.ProjectsService.getAllOpps().subscribe((res) => {
      this.projects = res;
      console.log(this.projects);
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