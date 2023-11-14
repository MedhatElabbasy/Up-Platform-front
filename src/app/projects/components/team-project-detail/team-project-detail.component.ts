import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-team-project-detail',
  templateUrl: './team-project-detail.component.html',
  styleUrls: ['./team-project-detail.component.scss']
})
export class TeamProjectDetailComponent {
  id!: any;
  details!: any;
  showDetail!: any;
  team!: any;
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
    this.service.getAllTeamProjects().subscribe((res) => {
      if (res) {
        this.details = res;
        console.log(this.details);
        this.details.forEach((ele: any) => {
          if (ele.id == this.id) {
            this.team = ele;
            console.log(this.team);
          }
        });
      }
    });
  }
}
