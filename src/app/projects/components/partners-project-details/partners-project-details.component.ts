import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-partners-project-details',
  templateUrl: './partners-project-details.component.html',
  styleUrls: ['./partners-project-details.component.scss']
})
export class PartnersProjectDetailsComponent {
  id!: any;
  details!: any;
  showDetail!: any;
  partner!: any;
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
    this.service.getAllParteners().subscribe((res) => {
      if (res) {
        this.details = res;
        console.log(this.details);
        this.details.forEach((ele: any) => {
          if (ele.id == this.id) {
            this.partner = ele;
            console.log(this.partner);
          }
        });
      }
    });
  }
}
