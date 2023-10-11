import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubRoutingModule } from './club-routing.module';
import { MainClubComponent } from './components/main-club/main-club.component';
import { ClubComponent } from './components/club/club.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { ActivitiesScheduleComponent } from './components/activities-schedule/activities-schedule.component';
// import { DropdownModule } from 'primeng/dropdown';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainClubComponent,
    ClubComponent,
    ActivitiesScheduleComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule,
    FormsModule,
    CoreModule
    // DropdownModule,
    // BrowserModule,
    // BrowserAnimationsModule
  ]
})
export class ClubModule { }
