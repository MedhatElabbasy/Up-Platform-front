import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  isLoading:boolean=true
  constructor(private service: ProjectsService, private router: Router,private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.getAllOpps();
    this.getAllOppsCategories();
  }

  navigate(id: any) {
    this.router.navigate([
      '/projects/projects-chance/chance-project-info/' + id,
    ]);
    console.log(id);
  }
  getAllOpps() {
    this.isLoading=false
    this.service.getAllOpps().subscribe((res) => {
      if(res){
      this.projects = res;
      this.isLoading=true
      }
    });
  }

  getAllOppsCategories() {
    this.service.getAllOppsCategories().subscribe((res) => {
      this.categories = res;

      this.categories.forEach((ele: any) => {
        this.allCategories.push(ele.opp_cat_name);
      });
    });
  }

}