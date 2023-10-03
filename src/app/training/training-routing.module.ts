import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTrainingComponent } from './components/main-training/main-training.component';
import { trainingRoutes } from './routes/training-routes';
import { TestComponent } from './components/test/test.component';
import { TrainingComponent } from './components/training/training.component';
import { PathsComponent } from './components/paths/paths.component';
import { SelectedPathComponent } from './components/selected-path/selected-path.component';
import { ProgramComponent } from './components/program/program.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { CourseComponent } from './components/course/course.component';
import { LeasonComponent } from './components/leason/leason.component';
import { LeasonTestComponent } from './components/leason-test/leason-test.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { EndCourseComponent } from './components/end-course/end-course.component';
import { FinalTestComponent } from './components/final-test/final-test.component';
import { TestPartTwoComponent } from './components/test-part-two/test-part-two.component';
import { TrainingPathsComponent } from './components/main-training/training-paths/training-paths.component';
import { SkillsLibraryComponent } from './components/main-training/skills-library/skills-library.component';
import { OnlineCoursesComponent } from './components/main-training/online-courses/online-courses.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    children: [
      {
        path: '',
        redirectTo: trainingRoutes.main,
        pathMatch: 'full',
      },
      {
        path: trainingRoutes.main,
        component: MainTrainingComponent,
        children: [
          {
            path: '',
            redirectTo: trainingRoutes.trainingPaths,
            pathMatch: 'full',
          },
          {
            path: trainingRoutes.trainingPaths,
            component: TrainingPathsComponent,
          },
          {
            path: trainingRoutes.skillsLibrary,
            component: SkillsLibraryComponent,
          },
          {
            path: trainingRoutes.onlineCourses,
            component: OnlineCoursesComponent,
          },
        ]
      },
      {
        path: trainingRoutes.test,
        component: TestComponent,
      },
      {
        path: trainingRoutes.paths,
        component: PathsComponent,
      },
      {
        path: trainingRoutes.selectedPath,
        component: SelectedPathComponent,
      },
      {
        path: trainingRoutes.program,
        component: ProgramComponent,
      },
      {
        path: trainingRoutes.roadmap,
        component: RoadmapComponent,
      },
      {
        path: trainingRoutes.course,
        component: CourseComponent,
      },
      {
        path: trainingRoutes.leason,
        component: LeasonComponent,
      },
      {
        path: trainingRoutes.leasonTest,
        component: LeasonTestComponent,
      },
      {
        path: trainingRoutes.certificate,
        component: CertificateComponent,
      },
      {
        path: trainingRoutes.pdf,
        component: PdfComponent,
      },
      {
        path: trainingRoutes.endCourse,
        component: EndCourseComponent,
      },
      {
        path: trainingRoutes.finalTest,
        component: FinalTestComponent,
      },
      {
        path: trainingRoutes.testPartTwo,
        component: TestPartTwoComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
