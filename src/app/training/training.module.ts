import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { MainTrainingComponent } from './components/main-training/main-training.component';
import { TestComponent } from './components/test/test.component';
import { TrainingComponent } from './components/training/training.component';
import { PathsComponent } from './components/paths/paths.component';
import { SelectedPathComponent } from './components/selected-path/selected-path.component';
import { ProgramComponent } from './components/program/program.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { CourseComponent } from './components/course/course.component';
import { LeasonComponent } from './components/leason/leason.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { LeasonTestComponent } from './components/leason-test/leason-test.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { EndCourseComponent } from './components/end-course/end-course.component';
import { FinalTestComponent } from './components/final-test/final-test.component';



@NgModule({
  declarations: [
    MainTrainingComponent,
    TestComponent,
    TrainingComponent,
    PathsComponent,
    SelectedPathComponent,
    ProgramComponent,
    RoadmapComponent,
    CourseComponent,
    LeasonComponent,
    PdfComponent,
    LeasonTestComponent,
    CertificateComponent,
    EndCourseComponent,
    FinalTestComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,

  ]
})
export class TrainingModule { }
