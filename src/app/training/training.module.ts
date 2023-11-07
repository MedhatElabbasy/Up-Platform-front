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
import { TestPartTwoComponent } from './components/test-part-two/test-part-two.component';
import { TrainingPathsComponent } from './components/main-training/training-paths/training-paths.component';
import { OnlineCoursesComponent } from './components/main-training/online-courses/online-courses.component';
import { SkillsLibraryComponent } from './components/main-training/skills-library/skills-library.component';
import { AllSkillsLibraryComponent } from './components/main-training/skills-library/all-skills-library/all-skills-library.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { CourseGeneralInfoComponent } from './components/course-details/course-general-info/course-general-info.component';
import { CourseScheduleComponent } from './components/course-details/course-schedule/course-schedule.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseInstructorComponent } from './components/course-details/course-instructor/course-instructor.component';
import { CourseRatingComponent } from './components/course-details/course-rating/course-rating.component';
import { CoreModule } from '../core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';



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
    FinalTestComponent,
    TestPartTwoComponent,
    TrainingPathsComponent,
    OnlineCoursesComponent,
    SkillsLibraryComponent,
    AllSkillsLibraryComponent,
    CourseGeneralInfoComponent,
    CourseScheduleComponent,
    CourseDetailsComponent,
    CourseInstructorComponent,
    CourseRatingComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' })
  ]
})
export class TrainingModule { }
