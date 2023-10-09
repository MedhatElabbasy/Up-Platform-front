import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SendCodeComponent } from './components/send-code/send-code.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { SuccessComponent } from './components/success/success.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    SignUpComponent,
    SendCodeComponent,
    VerifyCodeComponent,
    SuccessComponent,
    ResetPasswordComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CoreModule
    
  ],
  // providers: [
    
  //   {
  //     provide: 'SocialAuthServiceConfig',
  //     useValue: {
  //       autoLogin: false,
  //       providers: [
  //         {
  //           id: GoogleLoginProvider.PROVIDER_ID,
  //           provider: new GoogleLoginProvider(
  //             '605141817130-p3r8jrcukibc9ehs66dl3ls9bn1gja0o.apps.googleusercontent.com'
  //           )
  //         },
  //         // {
  //         //   id: FacebookLoginProvider.PROVIDER_ID,
  //         //   provider: new FacebookLoginProvider('clientId')
  //         // }
  //       ],
  //       onError: (err) => {
  //         console.error(err);
  //       }
  //     } as SocialAuthServiceConfig,
  //   }

  // ],
 
})
export class AuthModule { }
