import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubRoutingModule } from './club-routing.module';
import { MainClubComponent } from './components/main-club/main-club.component';
import { ClubComponent } from './components/club/club.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { ActivitiesScheduleComponent } from './components/activities-schedule/activities-schedule.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClubConditionsComponent } from './components/club-conditions/club-conditions.component';
import { ClubEventsComponent } from './components/club-events/club-events.component';
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule here
import { MatDatepickerModule } from '@angular/material/datepicker';  // Import MatDatepickerModule here
import { MatNativeDateModule } from '@angular/material/core';
// import { DropdownModule } from 'primeng/dropdown';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    //MainClubComponent,
    ClubComponent,
    ActivitiesScheduleComponent,
    ClubConditionsComponent,
    ClubEventsComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule,
    FormsModule,
    CoreModule,
    NgxPaginationModule,
    MatCardModule,  // Add MatCardModule to the imports array
    MatDatepickerModule,  // Add MatDatepickerModule to the imports array
    MatNativeDateModule 
    // DropdownModule,
    // BrowserModule,
    // BrowserAnimationsModule
  ]
})
export class ClubModule { }
