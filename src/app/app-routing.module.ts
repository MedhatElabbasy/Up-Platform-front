import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './routes/app-routes';
import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from './guards/auth.guard';
import { PreventAuthGuard } from './Guards/prevent-auth.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
