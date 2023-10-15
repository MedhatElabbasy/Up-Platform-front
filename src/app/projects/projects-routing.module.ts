import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { projectsRoutes } from './routes/projects-routes';
import { ProjectsDepartmentComponent } from './components/projects-department/projects-department.component';
import { ProjectsSimulationComponent } from './components/projects-simulation/projects-simulation.component';
import { ProjectsFinancingComponent } from './components/projects-financing/projects-financing.component';
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

const routes: Routes = [
  {
  path: '',
  component: ProjectsComponent,
  children: [
    {
      path: '',
      redirectTo: projectsRoutes.projectsDepartment,
      pathMatch: 'full',
    },
    {
      path: projectsRoutes.projectsDepartment,
      component: ProjectsDepartmentComponent,
    },
    {
      path: projectsRoutes.projectSimulation,
      component: ProjectsSimulationComponent,
    },
    {
      path: projectsRoutes.projectsfinancing,
      component: ProjectsFinancingComponent,
    },
    {
      path: projectsRoutes.projectsChance,
      component: ProjectsChanceComponent,
    },
    {
      path: projectsRoutes.projectsTeam,
      component: ProjectsTeamComponent,
    },
    {
      path: projectsRoutes.projectsTeamDetails,
      component: ProjectsTeamDetailsComponent,
    },
    {
      path: projectsRoutes.projectsTeamForm,
      component: ProjectsTeamFormComponent,
    },
    {
      path: projectsRoutes.projectsPartners,
      component:ProjectsPartnersComponent,
    },
    {
      path: projectsRoutes.newProjectForm,
      component:NewProjectFormComponent,
    },
    {
      path: projectsRoutes.projectsDesign,
      component:ProjectsDesignComponent,
    },
    {
      path: projectsRoutes.startProjects,
      component:StartProjectsComponent
    },
    {
      path: projectsRoutes.startProjectsSimulation,
      component:StartProjectsSimulationComponent
    },
    {
      path: projectsRoutes.chooseProject,
      component:ChooseProjectComponent
    },
    {
      path: projectsRoutes.powerOfIdea,
      component:PowerOfIdeaComponent
    },
    {
      path: projectsRoutes.powerOfIdeaDetails,
      component:PowerOfIdeaDetailsComponent
    },
    {
      path: projectsRoutes.feasibilityStudy,
      component:FeasibilityStudyComponent
    },
    {
      path: projectsRoutes.feasibilityStudyForm,
      component:FeasibilityStudyFormComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
