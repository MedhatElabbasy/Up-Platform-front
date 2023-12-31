import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalComponent } from './components/modal/modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    MatCardModule,
    MatNativeDateModule,
    DropdownModule,
    NgxSpinnerModule,
    NgxDropzoneModule
  ],
  exports: [
    DropdownModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    MatCardModule,
    MatNativeDateModule,
    ModalComponent,
    NgxSpinnerModule,
    // NgxDropzoneModule
  ]
})
export class CoreModule { }
