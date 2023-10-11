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
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
