import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './routes/app-routes';
import { HomeComponent } from './components/home/home.component';

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
  },
  {
    path: Routing.Training.module,
    loadChildren: () => import('./training/training.module').then((m) => m.TrainingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
