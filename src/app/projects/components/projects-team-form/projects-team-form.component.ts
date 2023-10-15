import { Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';


@Component({
  selector: 'app-projects-team-form',
  templateUrl: './projects-team-form.component.html',
  styleUrls: ['./projects-team-form.component.scss']
})
export class ProjectsTeamFormComponent {

  constructor(private _ModalService: ModalService){

  }
  onSubmit(){
    this._ModalService.open('addResturant');
  }
}
