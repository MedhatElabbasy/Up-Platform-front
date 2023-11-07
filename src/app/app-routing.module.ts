import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './routes/app-routes';
import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from './guards/auth.guard';
import { PreventAuthGuard } from './Guards/prevent-auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { WheelOfLuckComponent } from './components/wheel-of-luck/wheel-of-luck.component';
import { servicesRoutes } from './services/routes/services-routes';
import { BiographyComponent } from './services/components/biography/biography.component';
import { CartComponent } from './services/components/cart/cart.component'
import { PaymentComponent } from './services/components/payment/payment.component'
import { trainingRoutes } from './training/routes/training-routes';
import { CourseDetailsComponent } from './training/components/course-details/course-details.component';
import { CourseGeneralInfoComponent } from './training/components/course-details/course-general-info/course-general-info.component';
import { CourseInstructorComponent } from './training/components/course-details/course-instructor/course-instructor.component';
import { CourseScheduleComponent } from './training/components/course-details/course-schedule/course-schedule.component';
import { CourseRatingComponent } from './training/components/course-details/course-rating/course-rating.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'wheelOfLuck',
    component: WheelOfLuckComponent
  },
  {
    path: servicesRoutes.biography+'/:id',
    component: BiographyComponent,
  },
  {
    path: trainingRoutes.courseDetails+`/:id`,
    component: CourseDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: trainingRoutes.courseGeneralInfo,
        pathMatch: 'full',
      },
      {
        path: trainingRoutes.courseGeneralInfo,
        component: CourseGeneralInfoComponent,
      },
      {
        path: trainingRoutes.courseInstructor,
        component: CourseInstructorComponent,
      },
      {
        path: trainingRoutes.courseschedule,
        component: CourseScheduleComponent,
      },
      {
        path: trainingRoutes.courseRating,
        component: CourseRatingComponent,
      },
    ]
  },
  {
    path: Routing.Auth.module,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [PreventAuthGuard]
  },
  {
    path: Routing.Training.module,
    loadChildren: () => import('./training/training.module').then((m) => m.TrainingModule),

  },
  {
    path: Routing.Club.module,
    loadChildren: () => import('./club/club.module').then((m) => m.ClubModule),
  },
  {
    path: Routing.services.module,
    loadChildren: () => import('./services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: Routing.projects.module,
    loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
