import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { clubRoutes } from './routes/club-routes';
import { MainClubComponent } from './components/main-club/main-club.component';
import { ClubComponent } from './components/club/club.component';
import { ActivitiesScheduleComponent } from './components/activities-schedule/activities-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ClubComponent,
    children: [
      {
        path: '',
        redirectTo: clubRoutes.main,
        pathMatch: 'full',
      },
      {
        path: clubRoutes.main,
        component: MainClubComponent,
      },
      {
        path: clubRoutes.activitiesSchedule,
        component: ActivitiesScheduleComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
