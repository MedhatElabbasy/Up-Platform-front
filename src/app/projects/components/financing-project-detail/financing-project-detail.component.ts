import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-financing-project-detail',
  templateUrl: './financing-project-detail.component.html',
  styleUrls: ['./financing-project-detail.component.scss']
})
export class FinancingProjectDetailComponent {
  id!: any;
  details!: any;
  showDetail!: any;
  financing!: any;

  constructor(private route: ActivatedRoute, private service: ProjectsService) {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
      console.log(params['id']);
    });
    this.getProjectDetails();
  }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.service.getProjectFinancingData().subscribe((res) => {
      if (res) {
        this.details = res;
        console.log(this.details);
        this.details.forEach((ele: any) => {
          if (ele.id == this.id) {
            this.financing = ele;
            console.log(this.financing);
          }
          
        });
      }
    });
  }
}
