import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-projects-financing',
  templateUrl: './projects-financing.component.html',
  styleUrls: ['./projects-financing.component.scss']
})
export class ProjectsFinancingComponent {
  financingProjects: any[] = [];
  categories: any[] = [];
  isLoading:boolean=true
  allCate: any[] = ['الكل'];
  constructor(private service: ProjectsService, private router: Router , private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.viewProjectsFinancing();
    this.viewCategoriesFinancing();
  }
  // View financing projects
  viewProjectsFinancing() {
    this.isLoading=false
    this.service.getProjectFinancingData().subscribe(
      (res: any) => {
        this.financingProjects = res;
        this.isLoading=true;
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  navigate(id: any) {
    this.router.navigate([
      '/projects/projects-financing/financing-project-info/'+id,
    ]);
    console.log(id);
  }
  // handle financing projects categories
  viewCategoriesFinancing() {
    this.service.getAllFinancingCategory().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories);
      this.categories.forEach((ele: any) => {
        this.allCate.push(ele.fund_categories_name);
      });
    });
  }
}
