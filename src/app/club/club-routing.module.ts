import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { clubRoutes } from './routes/club-routes';
import { MainClubComponent } from './components/main-club/main-club.component';
import { ClubComponent } from './components/club/club.component';
import { ActivitiesScheduleComponent } from './components/activities-schedule/activities-schedule.component';
import { ClubConditionsComponent } from './components/club-conditions/club-conditions.component';
import { ClubEventsComponent } from './components/club-events/club-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';


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
      {
        path: clubRoutes.clubConditions,
        component: ClubConditionsComponent,
      },
      {
        path: clubRoutes.clubEvents,
        component: ClubEventsComponent,
      },
      {
        path: clubRoutes.eventDetails,
        component: EventDetailsComponent,
      }
    ],
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
