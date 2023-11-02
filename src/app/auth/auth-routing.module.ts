import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { authRoutes } from './routes/auth-routes';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SendCodeComponent } from './components/send-code/send-code.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { SuccessComponent } from './components/success/success.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: authRoutes.login,
        pathMatch: 'full',
      },
      {
        path: authRoutes.login,
        component: LoginComponent,
      },
      {
        path: authRoutes.signup,
        component: SignUpComponent,
      },
      {
        path: authRoutes.sendCode,
        component: SendCodeComponent,
      },
      {
        path: authRoutes.verifyCode,
        component: VerifyCodeComponent,
      },
      {
        path: authRoutes.verifyCode + '/:email',
        component: VerifyCodeComponent,
      },
      {
        path: authRoutes.resetPassword+ '/:email/:code',
        component: ResetPasswordComponent,
      },
      {
        path: authRoutes.success,
        component: SuccessComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }