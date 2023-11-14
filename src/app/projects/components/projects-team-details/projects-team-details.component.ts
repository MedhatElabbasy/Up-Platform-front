import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-team-details',
  templateUrl: './projects-team-details.component.html',
  styleUrls: ['./projects-team-details.component.scss']
})
export class ProjectsTeamDetailsComponent {
  teamProjects: any[] = [];
  teamCategories: any[] = [];
  modalId="applyApplication"
  constructor(private _project: ProjectsService , private _model:ModalService , private router: Router) {}
  ngOnInit(): void {
    this.viewTeamProjects();
    this.viewTeamCategories();
  }
  viewTeamProjects() {
    this._project.getAllTeamProjects().subscribe((res: any) => {
      this.teamProjects = res;
    });
  }

  viewTeamCategories() {
    this._project.getAllTeamCategories().subscribe((res: any) => {
      this.teamCategories = res;

    });
  }

  applyAppForPart(service_id:string){
    const formData = new FormData();
    const userDetailsString = localStorage.getItem('userDetails');
    const userId = userDetailsString ? JSON.parse(userDetailsString)?.id : null;
    formData.append('user_id', userId);
    formData.append('service_id', service_id);
    this._project.applyServiceApllication(formData).subscribe((res: any) => {
      console.log(res);
      if(res.status == 200) {
        console.log(res.msg);
        this._model.open(this.modalId)
      }
      else{
        console.log(res.msg);
      }
    });

  }

  redirect(id:number){
    this.router.navigate([
      '/projects/projects-team/team-project-info/'+id,
    ]);
  }

  cancel(){
    this._model.close(this.modalId)
    
  }
}
