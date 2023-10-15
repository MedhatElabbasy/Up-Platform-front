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
import { ProjectsPartnersComponent } from './components/projects-partners/projects-partners.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { ProjectsDesignComponent } from './components/projects-design/projects-design.component';
import { StartProjectsComponent } from './components/start-projects/start-projects.component';
import { StartProjectsSimulationComponent } from './components/start-projects-simulation/start-projects-simulation.component';
import { ChooseProjectComponent } from './components/choose-project/choose-project.component';
import { PowerOfIdeaComponent } from './components/power-of-idea/power-of-idea.component';
import { PowerOfIdeaDetailsComponent } from './components/power-of-idea-details/power-of-idea-details.component';
import { FeasibilityStudyComponent } from './components/feasibility-study/feasibility-study.component';
import { FeasibilityStudyFormComponent } from './components/feasibility-study-form/feasibility-study-form.component';


@NgModule({
  declarations: [
    ProjectsDepartmentComponent,
    ProjectsComponent,
    ProjectsSimulationComponent,
    ProjectsFinancingComponent,
    ProjectsChanceComponent,
    ProjectsTeamComponent,
    ProjectsTeamDetailsComponent,
    ProjectsTeamFormComponent,
    ProjectsPartnersComponent,
    NewProjectFormComponent,
    ProjectsDesignComponent,
    StartProjectsComponent,
    StartProjectsSimulationComponent,
    ChooseProjectComponent,
    PowerOfIdeaComponent,
    PowerOfIdeaDetailsComponent,
    FeasibilityStudyComponent,
    FeasibilityStudyFormComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    CoreModule
  ]
})
export class ProjectsModule { }
