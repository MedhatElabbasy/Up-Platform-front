import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubRoutingModule } from './club-routing.module';
import { MainClubComponent } from './components/main-club/main-club.component';
import { ClubComponent } from './components/club/club.component';
import { FormsModule } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainClubComponent,
    ClubComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule,
    FormsModule,
    // DropdownModule,
    // BrowserModule,
    // BrowserAnimationsModule
  ]
})
export class ClubModule { }
