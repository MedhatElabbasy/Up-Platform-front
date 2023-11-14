import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-chance-project-detail',
  templateUrl: './chance-project-detail.component.html',
  styleUrls: ['./chance-project-detail.component.scss']
})
export class ChanceProjectDetailComponent {
  id!: any;
  details!: any;
  showDetail!: any;
  chance!: any;
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
    this.service.getAllOpps().subscribe((res) => {
      if (res) {
        this.details = res;

        console.log(this.details);
        this.details.forEach((ele: any) => {
          if (ele.id == this.id) {
            this.chance = ele;
            console.log(this.chance.opp_name);
          }
        });
      }
    });
  }
}
