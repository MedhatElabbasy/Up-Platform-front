import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './routes/app-routes';

const routes: Routes = [
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
