
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddTokenInterceptor } from './Interceptors/add-token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProfileComponent } from './components/profile/profile.component';
import { WheelOfLuckComponent } from './components/wheel-of-luck/wheel-of-luck.component';
import { NgxWheelModule } from 'ngx-wheel';
import { AddApikeyInterceptor } from './Interceptors/add-apikey.interceptor';
import { CartComponent } from './services/components/cart/cart.component';
import { VerifyAccountComponent } from './auth/components/verify-account/verify-account.component';
import { PaymentComponent } from './services/components/payment/payment.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    WheelOfLuckComponent,
    CartComponent,
    VerifyAccountComponent,
    PaymentComponent

  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    NgxWheelModule
  ],
  exports: [
    NavbarComponent,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddApikeyInterceptor,
      multi: true,
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
