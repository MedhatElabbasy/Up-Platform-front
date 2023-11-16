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
import { FeasibilityStudyFinalComponent } from './components/feasibility-study-final/feasibility-study-final.component';
import { PurchasesDetailsComponent } from './components/purchases-details/purchases-details.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { MarketingCostComponent } from './components/marketing-cost/marketing-cost.component';
import { MarketingAdComponent } from './components/marketing-ad/marketing-ad.component';
import { MarketingCampaignComponent } from './components/marketing-campaign/marketing-campaign.component';
import { MarketingSalesComponent } from './components/marketing-sales/marketing-sales.component';
import { MarketingDistractionsComponent } from './components/marketing-distractions/marketing-distractions.component';
import { FinalReportComponent } from './components/final-report/final-report.component';
import { MarketingDesignAdComponent } from './components/marketing-design-ad/marketing-design-ad.component';
import { ChanceProjectDetailComponent } from './components/chance-project-detail/chance-project-detail.component';
import { FinancingProjectDetailComponent } from './components/financing-project-detail/financing-project-detail.component';
import { PartnersProjectDetailsComponent } from './components/partners-project-details/partners-project-details.component';
import { TeamProjectDetailComponent } from './components/team-project-detail/team-project-detail.component';

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
      children:[
        {
          path:'',
          component: ProjectsFinancingComponent,
        },
        {
          path:projectsRoutes.financingProjectDetail+'/:id',
          component:FinancingProjectDetailComponent
        }
      ]
    },
    {
      path: projectsRoutes.projectsChance,
      //component: ProjectsChanceComponent,
      children:[
        {
          path:'',
          component: ProjectsChanceComponent,
        },
        {
          path:projectsRoutes.chanceProjectInfo+'/:id',
          component:ChanceProjectDetailComponent
        }
      ]
    },
    {
      path: projectsRoutes.projectsTeam,
      //component: ProjectsTeamComponent,
      children:[
        {
          path:'',
          component: ProjectsTeamComponent
        },
        {
          path:projectsRoutes.teamProjectInfo+'/:id',
          component:TeamProjectDetailComponent,
        },
        {
          path: projectsRoutes.projectsTeamDetails,
          component: ProjectsTeamDetailsComponent,
        },
        {
          path: projectsRoutes.projectsTeamForm,
          component: ProjectsTeamFormComponent,
        },
      ]
    },
    
    {
      path: projectsRoutes.projectsPartners,
      //component:ProjectsPartnersComponent,
      children:[
        {
          path:'',
          component:ProjectsPartnersComponent,
        },
        {
          path:projectsRoutes.partnersProjectInfo+'/:id',
          component:PartnersProjectDetailsComponent
        },
        {
          path: projectsRoutes.newProjectForm,
          component:NewProjectFormComponent,
        },
      ]
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
      path: projectsRoutes.chooseProject+'/:id',
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
    },
    {
      path: projectsRoutes.feasibilityStudyFinal,
      component:FeasibilityStudyFinalComponent
    },
    {
      path: projectsRoutes.PurchasesDetails,
      component:PurchasesDetailsComponent
    },
    {
      path: projectsRoutes.purchases,
      component:PurchasesComponent
    },
    {
      path: projectsRoutes.marketing,
      component:MarketingComponent
    },
   {
      path: projectsRoutes.marketingCost,
      component:MarketingCostComponent
    },
    {
      path: projectsRoutes.marketingDesignAD,
      component:MarketingDesignAdComponent
    },
    {
      path: projectsRoutes.marketingAD,
      component:MarketingAdComponent
    },
    {
      path: projectsRoutes.marketingCampaign,
      component:MarketingCampaignComponent
    },
    {
      path: projectsRoutes.marketingSales,
      component:MarketingSalesComponent
    },
    {
      path: projectsRoutes.marketingDistractions,
      component:MarketingDistractionsComponent
    },
    {
      path: projectsRoutes.finalReport,
      component:FinalReportComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
