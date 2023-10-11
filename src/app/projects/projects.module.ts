import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsDepartmentComponent } from './components/projects-department/projects-department.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectsSimulationComponent } from './components/projects-simulation/projects-simulation.component';
import { ProjectsFinancingComponent } from './components/projects-financing/projects-financing.component';
import { CoreModule } from '../core/core.module';
import { ProjectsChanceComponent } from './components/projects-chance/projects-chance.component';
import { ProjectsTeamComponent } from './components/projects-team/projects-team.component';
import { ProjectsTeamDetailsComponent } from './components/projects-team-details/projects-team-details.component';
import { ProjectsTeamFormComponent } from './components/projects-team-form/projects-team-form.component';


@NgModule({
  declarations: [
    ProjectsDepartmentComponent,
    ProjectsComponent,
    ProjectsSimulationComponent,
    ProjectsFinancingComponent,
    ProjectsChanceComponent,
    ProjectsTeamComponent,
    ProjectsTeamDetailsComponent,
    ProjectsTeamFormComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    CoreModule
  ]
})
export class ProjectsModule { }
