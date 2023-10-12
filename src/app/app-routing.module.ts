import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './routes/app-routes';
import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from './guards/auth.guard';
import { PreventAuthGuard } from './Guards/prevent-auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { WheelOfLuckComponent } from './components/wheel-of-luck/wheel-of-luck.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
